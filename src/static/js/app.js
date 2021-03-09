const ytsSearchTerms = document.getElementById('yts-search-terms')
const ytsSearchList = document.getElementById('yts-search-list')
const ytsSearchResult = document.getElementById('yts-result')
const ytsSearchResultList = document.getElementById('yts-result-list')

function handleYtsOnKeyup(e) {
    const searchTerm = e.target.value
    if (e.keyCode === 13) return
    if(searchTerm.length === 0) {
        hideResults()
        hideTerms()
    }
    if (searchTerm.length >= 3) {
        getYtsResult(searchTerm, mapTermList, handleTermListError)
    }
}

function showYtsResult(e) {
    e.preventDefault()
    const searchTerm = document.getElementById('yts-search-field').value
    if(searchTerm.length === 0) {
        hideResults()
        hideTerms()
    }
    if (searchTerm.length >= 3) {
        getYtsResult(searchTerm, mapResultList, handleResultListError)
    }
}

function getYtsResult(term, callback, errorCallback) {
    $.ajax({
        type: "GET",
        url: "api/youtube",
        data: {
            term: term
        },
        success: function (data) {
            callback(JSON.parse(data))
        },
        error: function (error) {
            errorCallback(error)
        }
    })
}

function mapTermList(data) {
    ytsSearchTerms.style.display = 'block'
    ytsSearchResult.style.display = 'none'
    if(data && data.items && data.items.length) {
        const titles = data.items.map(function(item) {
            return `<li onclick="showYtsResult(event)">${item.snippet.title}</li>`
        })
        ytsSearchList.innerHTML  = titles.join('')
    } else {
        ytsSearchList.innerHTML = '<li>No matching title found</li>'
    }
}

function mapResultList(data) {
    ytsSearchResult.style.display = 'block'
    ytsSearchTerms.style.display = 'none'
    if(data && data.items && data.items.length) {
        const items = data.items.map(function(item) {
            return `<li class="media">
                <img src="${item.snippet.thumbnails.default.url}" class="mr-3"/>
                <div class="media-body">
                    <h5 class="mt-0 mb-1"><a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">${item.snippet.title}</a></h5>
                    <p>${item.snippet.description}</p>
                </div>
            </li>`
        })
        ytsSearchResultList.innerHTML = items.join('')
    } else {
        ytsSearchResultList.innerHTML = '<li>No matching title found</li>'
    }
}

function handleTermListError(error) {
    console.log('handle term list error', error)
}

function handleResultListError(error) {
    console.log('handle result list error', error)
}

function hideResults() {
    ytsSearchResultList.innerHTML = ''
    ytsSearchResult.style.display = 'none'
}

function hideTerms() {
    ytsSearchList.innerHTML = ''
    ytsSearchTerms.style.display = 'none'
}