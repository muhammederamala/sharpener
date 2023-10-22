const Group = require('./groups')
const GroupMember = require('./groupMembers')
const User = require('./user')
const Invitations = require('./invitations')
const Message = require('./message')

// group
Group.belongsTo(User, { foreignKey: "creatorUser" })

// invitation
Invitations.belongsTo(User, { foreignKey: 'senderUserId', as: 'sender' });
Invitations.belongsTo(User, { foreignKey: 'recipientUserId', as: 'recipient' });
Invitations.belongsTo(Group, { foreignKey: 'groupId', as: 'group' });

// Message
Message.belongsTo(Group, { foreignKey: "groupId" })
User.hasMany(Message)
Message.belongsTo(User)

// user
User.belongsToMany(Group, { through: GroupMember, as: 'groups', foreignKey: 'MemberUserID' });
Group.belongsToMany(User, { through: GroupMember, as: 'members', foreignKey: 'groupId' });

module.exports = {
    User,
    Group,
    GroupMember,
    Message,
    Invitations
};
