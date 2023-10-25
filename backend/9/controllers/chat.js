const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const Sequelize = require("sequelize");

const path = require('path');
const { 
    User, 
    Message, 
    Group, 
    Invitations, 
    GroupMember 
} = require('../models/z');

// decode jwt token and return claim
function decodeToken(token, secret) {
    try {
      const decoded = jwt.verify(token, secret);
      const groupId = decoded.GroupId;
      return groupId;
    } catch (error) {
      // Handle invalid tokens or other errors here
      console.error('Error decoding the token:', error);
      return null;
    }
}

exports.decodeJwtToken = async (req,res,next) =>{
    let groupIdToken = req.query.groupId
    const groupId = decodeToken(groupIdToken,process.env.TOKEN_SECRET_KEY)

    try{
        res.status(201).json({groupId:groupId});
    }
    catch(err){
        res.status(404)
    }
}

exports.getHome = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/chat/home.html');
    res.sendFile(filePath)
}

exports.getChat = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/chat/chat.html');
    res.sendFile(filePath)
}

exports.getAddGroup = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/chat/group-form.html');
    res.sendFile(filePath)
}

exports.postSendMessage = async (req,res,next) =>{
    try{
        const { message,file, groupIdToken } = req.body;
        const userId = req.user.id;
        const io = req.io

        const user = await User.findOne({
            where:{
                id:userId
            },
            attributes: ['name'],
        });
        const userName = user.name;
        const groupId = decodeToken(groupIdToken, process.env.TOKEN_SECRET_KEY);

        let newMessage;

        if (file) {
            // If it's a file, create the message with the file field and remove the message field
            newMessage = await Message.create({
                name: userName,
                file: file,
                groupId: groupId,
                userId: userId
            });
        } 
        else {
            // If it's text, create the message with the message field
            newMessage = await Message.create({
                name: userName,
                message: message,
                groupId: groupId,
                userId: userId
            });
        }

        io.emit('new-message', newMessage);

        return res.status(201).json(newMessage)
    }
    catch(err){
        return res.status(500).json({Error:"Failed to send the message"});
    }
}

exports.getNewMessage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const groupIdToken = req.query.groupId;
        const lastMessageId = req.query.lastMessageId;
        const groupId = decodeToken(groupIdToken, process.env.TOKEN_SECRET_KEY);

        // Define a condition to only retrieve newer messages
        const condition = {
            groupId: groupId
        };

        if (lastMessageId) {
            condition.id = {
                [Op.gt]: lastMessageId // Only get messages with an ID greater than the last known message ID
            };
        }

        let messages = await Message.findAll({
            where: condition,
            order: [['id', 'ASC']] // You can change 'ASC' to 'DESC' if you want the latest messages first
        });

        if (messages.length > 0) {
            // Get the ID of the last message in the result set
            const lastMessage = messages[messages.length - 1];
            const lastMessageId = lastMessage.id;

            // Map the messages to create a new array with sender information
            const messagesWithSender = messages.map((message) => {
                const senderName = message.userId === userId ? "You" : message.name;
                return {
                    id: message.id,
                    text: message.message,
                    sender: senderName,
                };
            });

            res.json({ messages: messagesWithSender, lastMessageId });
        } else {
            // No new messages
            res.json({ messages: [], lastMessageId });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getAllMessages = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const groupIdToken = req.query.groupId
        const groupId = decodeToken(groupIdToken, process.env.TOKEN_SECRET_KEY);

        let messages = await Message.findAll({
            where:{
                groupId:groupId
            }
        });

        // Map the messages to create a new array with sender information
        const messagesWithSender = messages.map((message) => {
            const senderName = message.userId === userId ? "You" : message.name;
            return {
                id: message.id,
                text: message.message,
                sender: senderName,
            };
        });

        res.json({ messages: messagesWithSender });
    } catch (err) {
        console.log(err);
    }
};

exports.postAddGroup = async (req,res,next) =>{
    try{
        const { groupName, groupMembers } = req.body
        const userId = req.user.id
        const io = req.io

        const response = await Group.create({
            GroupName: groupName,
            creatorUser: userId
        })

        let groupId = response.GroupId

        const result = await GroupMember.create({
            groupId: groupId,
            MemberUserID: userId,  
            isAdmin: true
        })

        await sendInvite(userId,groupMembers,response.GroupId)

        return res.status(201).json({response})

    }
    catch(err){
        res.status(500)
    }
}

exports.addNewParticipant = async (req,res,next) =>{
    try{
        const userId = req.user.id
        const groupIdToken = req.query.groupId
        const groupId = decodeToken(groupIdToken,process.env.TOKEN_SECRET_KEY)
        const groupMembers = req.body.phoneNumber

        await sendInvite(userId,groupMembers,groupId)
        return res.status(201).json({response})
    }
    catch(err){
        res.status(404)
    }
}

async function sendInvite(userId,groupMembers,groupId){
    try {
        const users = await User.findAll({
            where: {
                phone: groupMembers, // An array of email addresses to match
            },
            attributes: ['id'], // Specify the attribute to retrieve
        });
        
        // Now use map on the resolved array to extract user IDs
        const invitedUserIds = users.map(user => user.id);

        for (const invitedUserId of invitedUserIds) {
            await Invitations.create({
                senderUserId: userId, // The user who is sending the invite
                recipientUserId: invitedUserId, // The user who is receiving the invite
                groupId: groupId, // The ID of the group
            });
        }

        return("Succesfully sent invites")

        // Proceed with sending invites, using the `invitedUserIds` array as needed
    } catch (error) {
        res.status(404).json({ message:'Error finding users by email' });
    }

}

exports.getAllInvites = async (req,res,next) =>{
    try{
        const userId = req.user.id

        const userName = await User.findByPk(userId,{
            attributes:['name']
        })

        const invites = await Invitations.findAll({
            where:{
                recipientUserId: userId,
                status: "pending"
            },
            include: [
                {
                    model: Group,
                    attributes: ['GroupName'], 
                    as: 'group' // Use the alias you've defined for the association in your models
                },
                {
                    model: User, 
                    attributes: ['name'],
                    as: 'sender', // Use the alias you've defined for the association in your models
                }
            ]
        })

        res.json({invites:invites,userName:userName})
    }
    catch(err){
        console.log(err)
    }
}

exports.handleInvitation = async (req,res,next) =>{
    try{
        const { status, GroupId } = req.body
        const userId = req.user.id

        const response = await Invitations.update({status:status},{
            where:{
                recipientUserId: userId,
                groupId: GroupId
            }
        })
        
        if(status === "accepted"){
            const result = addMembers(GroupId,userId)
        }

        res.status(201).json({message:status})
    }
    catch(err){
        res.status(404).json({message:"Page not found"})
    }
}

async function addMembers(groupId,userId){
    return response = await GroupMember.create({
        groupId: groupId,
        MemberUserID: userId
    })
}

exports.getAllGroups = async (req, res, next) => {
    try {
      const userId = req.user.id;
  
      // Find all groups where the user is a member
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Group,
            as: 'groups',
            attributes: ['GroupName','GroupId'], // Use the alias you defined for the association
          },
        ],
      });

      // Extract group names from the result
      const groups = user.groups; // Use the alias here
      const groupNames = groups.map(group => ({
        GroupId: group.GroupId,
        GroupName: group.GroupName,
        Token: jwt.sign({ GroupId: group.GroupId }, process.env.TOKEN_SECRET_KEY),
      }));
  
      res.status(200).json({ groups:groupNames });
    } catch (err) {
      next(err);
    }
};

exports.getAllParticipants = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const groupIdToken = req.query.groupId;
        const groupId = decodeToken(groupIdToken, process.env.TOKEN_SECRET_KEY);

        const groupMembers = await GroupMember.findAll({
            where: {
                groupId: groupId
            }
        });

        // Create a new object to include membership information
        const participantsWithMembership = await Promise.all(groupMembers.map(async (member) => {
            const user = await User.findOne({
                where: {
                    id: member.MemberUserID
                },
                attributes: ['id', 'name', 'phone']
            });

            return {
                id: user.id,
                name: user.name,
                phone: user.phone,
                membership: member.isAdmin? 'admin' : 'member'
            };
        }));

        const currentUserMembership = participantsWithMembership.find(participant => participant.id == userId)
        const currentUser = currentUserMembership && currentUserMembership.membership === 'admin'

        res.status(200).json({
            participants: participantsWithMembership, 
            currentUser: currentUser, 
            userId:userId
        });

    } catch (err) {
        console.log(err);
        res.status(404).json({ error: err.message });
    }
}

exports.makeAdmin = async (req,res,next) =>{
    try{
        const participantId = req.body.participantId;
        const groupIdToken = req.body.groupId;
        const groupId = decodeToken(groupIdToken,process.env.TOKEN_SECRET_KEY)
        const userId = req.user.id

        const requestingUserIsAdmin = await GroupMember.findOne({
            where: {
                MemberUserID: userId,
                groupId: groupId,
                isAdmin: true
            }
        });

        if(requestingUserIsAdmin){
            let adminGroup = await GroupMember.update({ isAdmin: true}, 
                {
                    where:{
                        MemberUserID:participantId,
                        groupId:groupId
                    }
                }
            )
            res.status(200).json({message:"Admin added"})
        }

        else {
            // The requesting user is not an admin, so return an error
            res.status(403).json({ message: "Access denied. You are not an admin in this group." });
        }
    }
    catch(err){
        res.status(404).json({message:"Page not found!"})
    }
}

exports.removeMember = async (req,res,next) =>{
    try{
        const userId = req.user.id;
        const participantId = req.query.participantId;
        const groupIdToken = req.query.groupId;
        const groupId = decodeToken(groupIdToken,process.env.TOKEN_SECRET_KEY);

        await GroupMember.destroy({
            where:{
                MemberUserID:participantId,
                groupId:groupId
            }
        });
        res.status(200).json({message:"Successfully removed member from the group"});
    }
    catch(err){
        res.status(404).json({message:"Page not found"})
    }
}