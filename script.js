function myFunction(){
    const form = document.getElementById('job_description');
    form.addEventListener('submit', collectdata);
}

function collectdata(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const formDataObj=Object.fromEntries(formData.entries());
    (async () => {
        const response = await chrome.runtime.sendMessage( {form:formDataObj});
      })();

}

document.addEventListener('DOMContentLoaded', function(){
    var testbutton = document.getElementById('myButton');
    testbutton.addEventListener('click', myFunction);
});

  