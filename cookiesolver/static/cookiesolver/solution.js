document.addEventListener('DOMContentLoaded',function(){
    //
    const btn = document.querySelector('button')
    // 
    btn.disabled = true
    btn.style.opacity = '0.7'
    // 
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

    let word_count = 'All'

    document.querySelector('select').onchange = function(select){
        word_count = this.value
    }

    // function gets user input save it into a variable and send it to django view to work with through the sendUserInput function
    document.querySelector('button').addEventListener('click',function(){
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
                sendUserInput(input_value.value.toLowerCase())
                // 
                if (word_count == "All"){
                    retrieveOutput('All')
                }
                else{
                    retrieveOutput(parseInt(word_count))
                }
                // 
                setTimeout(popup,5000)
            }
        }
    })

    function popup(){
        document.querySelector('.shadow').style.display = 'none'
        // 
        document.querySelector('.letters').style.opacity = '1'
        //  
    }
    
    // function send user input to django views
    function sendUserInput(vaue){
        fetch('/getUserInput',{
            method: 'POST',
            body: JSON.stringify({
                userInput:vaue
            })
        })
    }

    // function retrieves possible word that can be formed by the letter entered by the user and appends them to the webpage
    function retrieveOutput(numb){
        fetch('/retrieve')
        .then(response => response.json())
        .then(data => {
            const result_length = Object.keys(data.answer).length
            if (result_length > 0){
                // console.log(data.answer)
                if (numb == 'All'){
                    const values = data.answer
                    // looping through dict
                    for (const words in values){
                        if(values[words].length > 0 ){
                            //
                            const div_element = document.createElement('div')
                            div_element.style.cssText = `margin-bottom:2em`
                            div_element.className = 'n_words_container'
                            // 
                            const h1_element = document.createElement('h1')
                            h1_element.innerHTML = `${words} Letters`
                            h1_element.className = 'count_words'
                            div_element.append(h1_element)
                            // 
                            values[words].forEach(function(word){
                                const letters_section = document.createElement('section')
                                letters_section.style.cssText = `display:flex;flex-direction:row;margin-bottom:2em`
                                letters_section.className = 'word_block'
                                // convert individual elements in an array into an array
                                list_word = word.split('')
                                list_word.forEach(function(list_word){
                                    const letter_container = document.createElement('div')
                                    letter_container.className = 'letter_block'
                                    letter_container.innerHTML = list_word
                                    letters_section.append(letter_container)
                                })
                                div_element.append(letters_section)
                            })
                            document.querySelector('.letters').append(div_element)
                            document.querySelector('.letters').style.opacity = 0
                        }
                    }
                }
                else{
                    const result_length = Object.keys(data.answer[numb]).length
                    // 
                    if(result_length > 0){
                        const values = data.answer
                        const div_element = document.createElement('div')
                        div_element.style.cssText = `margin-bottom:2em`
                        div_element.className = 'n_words_container'
                        // 
                        const h1_element = document.createElement('h1')
                        h1_element.innerHTML = `${numb} Letters`
                        h1_element.className = 'count_words'
                        div_element.append(h1_element)
                        // 
                        values[numb].forEach(function(word){
                            const letters_section = document.createElement('section')
                            letters_section.style.cssText = `display:flex;flex-direction:row;margin-bottom:2em`
                            letters_section.className = 'word_block'
                            // convert individual elements in an array into an array
                            list_word = word.split('')
                            list_word.forEach(function(list_word){
                                const letter_container = document.createElement('div')
                                letter_container.className = 'letter_block'
                                letter_container.innerHTML = list_word
                                letters_section.append(letter_container)
                            })
                            div_element.append(letters_section)
                        })
                        document.querySelector('.letters').append(div_element)
                      document.querySelector('.letters').style.opacity = 0
                    }
                    else{
                        alert(`Could not get ${numb} letter words `)
                    }
                }
            }
            else{
                alert('Enter a valid word')
            }
        })
    }
})