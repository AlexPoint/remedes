---
---

// Use the library typeahead.js for the auto-complete suggestions
// See https://twitter.github.io/typeahead.js/examples/

var drugs = new Bloodhound({
  	datumTokenizer: function (drug) {
        return Bloodhound.tokenizers.whitespace(drug.name);
    },
   	queryTokenizer: Bloodhound.tokenizers.whitespace,
  	prefetch: '/assets/drug-search.json',
  	ttl: {{site.disable-auto-suggest-cache}} 
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
    	empty: '<div class="empty-message">Aucun médicament trouvé</div>',
    	suggestion: Handlebars.compile('<div>{{name}}</div>')
    }
});

search.on('typeahead:selected', function (evt, data) {
    window.location = data.url;
});