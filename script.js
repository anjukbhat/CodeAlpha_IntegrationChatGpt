const API_KEY="";
const submitBtn=document.querySelector('#submit');
const outPutElement=document.querySelector('#output')
const inputElement=document.querySelector('input')
const historyEle=document.querySelector(".history")
const btn=document.querySelector("button")

function changeInput(value){
  const inputElement=document.querySelector('input')
  inputElement.value=value
}
async function getMessage(){
    console.log('clicked')
    const options={
        method:'POST',
        headers:{
            'Authorization': `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              
              {
                role: "user",
                content: inputElement.value,
              }
            ],
            max_tokens:100
          })
    }
    try{
        const response= await fetch("https://api.openai.com/v1/chat/completions",options)
        const data=await response.json()
        console.log(data)
        outPutElement.textContent=data.choices[0].message.content
        if (data.choices[0].message.content ){
          const pEle=document.createElement('p')
          pEle.textContent=inputElement.value
          pEle.addEventListener('click',()=> changeInput(pEle.textContent))
          historyEle.append(pEle)
        }


    } catch (error){
        console.error(error)

    }
}
submitBtn.addEventListener('click',getMessage)

function clearInp(){
  inputElement.value=''
}

btn.addEventListener('click',clearInp)