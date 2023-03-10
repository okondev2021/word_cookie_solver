document.addEventListener('DOMContentLoaded',function(){
    //
    const btn = document.querySelector('button')
    // 
    btn.disabled = true
    btn.style.opacity = '0.7'
    // when user is typing
    document.querySelector('input').onkeyup = function(){
        if (document.querySelector('input').value ==="" ){
            btn.disabled = true
            btn.style.opacity = '0.7'
        }
        else{
            btn.disabled = false
            btn.style.opacity = '1'
        }
    }

    var word_count = document.querySelector('select').value
    // gets and saves new value when a new value is selected
    document.querySelector('select').onchange = function(select){
        word_count = this.value
    }

    // function gets user input save it into a variable and send it to django view to work with through the sendUserInput function
    document.querySelector('button').addEventListener('click',function(){


        // increment search count and update db
        fetch('/incrementSearchCount')

        const user_input = document.querySelector('input').value
        if(user_input.length > 6 ){
            alert('Input must not be grater than 6 words')
        }
        else{
            if (word_count > user_input.length){
                alert(`Word entered must be equal to or greater than ${word_count} letters`)
            }
            else{
                // 
                document.querySelector('.shadow').style.display = 'block'
                // 
                var result_container = document.querySelector('.letters')
                result_container.innerHTML = " "
                // 
                const input_value = document.querySelector('input')
                // 
                if (word_count == "All"){
                    sendUserInput(input_value.value.toLowerCase(),"All")
                }
                else{
                    sendUserInput(input_value.value.toLowerCase(), parseInt(word_count))
                }
                // 
                setTimeout(popup,5000)
            }
        }
    })

    // changes cookie pan and shadow diplay,opacity property to none and 0
    function popup(){
        document.querySelector('.shadow').style.display = 'none'
        // 
        document.querySelector('.letters').style.opacity = '1'
        //  
    }
    
    // function send user input to django views
    function sendUserInput(vaule,Number){
        fetch('/getUserInput',{
            method: 'POST',
            body: JSON.stringify({
                userInput:vaule
            })
        })
        .then(response=> response.json())
        .then(data => {
            // 
            const values = data.answer
            // display response on the page for user
            function cookieResultDisplay(input){
                // 
                const div_element = document.createElement('div')
                div_element.style.cssText = `margin-bottom:2em`
                div_element.className = 'n_words_container'
                // 
                const h1_element = document.createElement('h1')
                h1_element.innerHTML = `${input} Letters`
                h1_element.className = 'count_words'
                div_element.append(h1_element)
                // 
                if( values[input] == undefined || values[input].length  === 0){
                    alert('No word found')
                }
                else{
                    values[input].forEach(function(word){
                        const word_container = document.createElement('section')
                        word_container.style.cssText = `display:flex;flex-direction:row;margin-bottom:2em`
                        word_container.className = 'word_block'
                        // slipt individual elements in an array(converting them to an array) loop through and append them to a new element
                        list_word = word.split('')
                        list_word.forEach(function(list_word){
                            const letter_container = document.createElement('div')
                            letter_container.className = 'letter_block'
                            letter_container.innerHTML = list_word
                            word_container.append(letter_container)
                        })
                        div_element.append(word_container)
                    })
                }
                document.querySelector('.letters').append(div_element)
                document.querySelector('.letters').style.opacity = 0
            }

            // get the length of response gotten from request 
            const result_length = Object.keys(data.answer).length
            if (result_length > 0){
                // 
                if (Number == 'All'){
                    // looping through dict to get the keys --> represent the n_letter
                    for (const wordCount in values){
                        cookieResultDisplay(wordCount)
                    }
                }
                else{
                    cookieResultDisplay(Number)
                }
            }
            else{
                alert('Enter a valid word')
            }
            // 
        })
        // 
    }
    // 
})