// Use the library typeahead.js for the auto-complete suggestions
// See https://twitter.github.io/typeahead.js/examples/

var drugs = new Bloodhound({
  	datumTokenizer: function (drug) {
        return Bloodhound.tokenizers.whitespace(drug.name);
    },
   	queryTokenizer: Bloodhound.tokenizers.whitespace,
  	prefetch: '/assets/drug-search.json'
});
drugs.initialize();


var search = $('#drug-search').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
},
{
    name: 'drugs',
    source: drugs
});

search.on('typeahead:selected', function (evt, data) {
    window.location = data.url;
});