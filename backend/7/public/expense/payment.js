
document.getElementById("razor-pay").onclick = async function (e){
  const token = localStorage.getItem("Token")
  console.log("this is the token",token)
  const response = await axios.get("http://localhost:3000/purchase/premium-membership",
  { 
    headers:{
      "Authorization":`Bearer ${token}`
    }
  })
  console.log(response)
  var options = {
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler":async function (response) {
      await axios.post('http://localhost:3000/purchase/update-transaction-status',
      {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
      },{headers: {"Authorization":`Bearer ${token}`}} )
      alert("You are now a premium user")
    },
  };
  const rzp1 = new Razorpay(options)
  rzp1.open();
  e.preventDefault()
  rzp1.on('payment failed',function(response){
    console.log(response)
    alert("Something went wrong")
  }) 
}
