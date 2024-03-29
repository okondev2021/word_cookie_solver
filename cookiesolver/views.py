from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
import json
from django.views.decorators.csrf import csrf_exempt
import itertools
from .models import COOKIE_COUNT

# Create your views here.
class cookie_solver:
    def index(request):
        return render(request,'cookiesolver/index.html')
        
    def solution(request):
        return render(request,'cookiesolver/solution.html')

    def about(request):
        return render(request,'cookiesolver/about.html')
    
    def search(request):
        search_count = COOKIE_COUNT.objects.get(id = 1)
        return render(request,'cookiesolver/search_count.html',{'search_count':search_count})

    @csrf_exempt
    def increment_Search_Count(request):
        get_search_count = COOKIE_COUNT.objects.get(id = 1)
        value = get_search_count.SEARCH_COUNT
        new_value = int(value) + 1
        increment_search_count = COOKIE_COUNT.objects.filter(id = 1).update(SEARCH_COUNT = new_value)
        return JsonResponse({'RESULT':'SUCCESS'})


    @csrf_exempt
    def getUserInput(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            if data.get('userInput') is not None:
                savedInput = data['userInput']
                # 
                def open_dictionary_file():
                    """Opening up the file containing over 350 thousand word"""
                    with open('cookiedict.txt', 'r') as filename:
                        dic_file = filename.read()
                        dic_list = dic_file.split()
                    return dic_list

                def word_cookies_dictionary(a_function):
                    """Creating a dictionary with the keys as a casted number to string
                    and values as empty list that would get words appended during sorting."""
                    universal_dictionary = {}
                    for i in a_function:
                        if str(len(i)) in universal_dictionary:
                            universal_dictionary[str(len(i))].append(i)
                        else:
                            universal_dictionary[str(len(i))] = [i]
                    for item in universal_dictionary:
                        universal_dictionary[item] = dict()
                    for val in a_function:
                        if str(len(val)) in universal_dictionary and val[0] in universal_dictionary[str(len(val))]:
                            universal_dictionary[str(len(val))][val[0]].append(val)
                        else:
                            universal_dictionary[str(len(val))][val[0]] = []
                    return universal_dictionary

                def create_anagrams(function1, function2):
                    """Function to help create anagrams of different length of the users word"""
                    final_result = []
                    for item in range(len(function2), 2, -1):
                        # printing result in reduction of one
                        results = itertools.permutations(function2, item)
                        for j in results:
                            word_get = ''.join(j)
                            # checking if func word is in the particular key
                            if word_get in function1[str(len(word_get))][word_get[0]]:
                                final_result.append(word_get)
                            else:
                                pass
                    return set(final_result)

                def n_letter_words(data):
                    """sorts receiving data for better output"""
                    sort_list = []
                    for i in data:
                        sort_list.append(i)
                    sort_list.sort(key = len,reverse = False)
                    """Function to arrange the result gotten in terms of length of letters"""
                    arranged_results = dict()
                    for i in data:
                        if str(len(i)) in arranged_results:
                            arranged_results[str(len(i))].append(i)
                        else:
                            arranged_results[str(len(i))] = [i]
                    return arranged_results

        return JsonResponse({
            'answer' : n_letter_words((create_anagrams(word_cookies_dictionary(open_dictionary_file()), savedInput )))
            })

    




