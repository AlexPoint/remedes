---
---

// Set js variables which need the liquid engine at the beginning of the file
var disableAutoSuggestCache = {{site.disable-auto-suggest-cache}};

// Then write all the js code in a raw section to avoid potential conflicts between liquid and other templating engines.
{% raw %}
// Use the library typeahead.js for the auto-complete suggestions
// See https://twitter.github.io/typeahead.js/examples/

var drugs = new Bloodhound({
  	datumTokenizer: function (drug) {
        return Bloodhound.tokenizers.whitespace(drug.name);
    },
   	queryTokenizer: Bloodhound.tokenizers.whitespace,
  	prefetch: '/assets/drug-search.json',
  	ttl: disableAutoSuggestCache
});
drugs.initialize();


var search = $('#drug-search').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
},
{
    name: 'drugs',
    display: 'name',
    source: drugs,
    templates: {
    	empty: '<div class="empty-message">Aucun médicament ne correspond à la recherche</div>',
    	suggestion: Handlebars.compile('<div>{{name}}</div>')
    }
});

search.on('typeahead:selected', function (evt, data) {
    window.location = data.url;
});

{% endraw %}