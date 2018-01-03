var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var _ = require('underscore');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var _DATA = dataUtil.loadData().objects;

var abvMap = dataUtil.loadStates();

app.get('/', function(req, res) {
     var states = [];
     for (state in abvMap) {
        states.push(state);
    }
    res.render('allstates', {
        states: states
    });
})

app.get('/party/:party', function(req, res) {
    var party = req.params.party;
    var entries = [];
    for (entry in _DATA) {
        if (party === _DATA[entry].party + "s") {
            var stateName = "";
            for (state in abvMap) {
                if (abvMap[state] == _DATA[entry].state) {
                    stateName = state;
                    break;
                }
            }
            entries.push({
                repid: _DATA[entry].person.id,
                name: _DATA[entry].person.name,
                state: _DATA[entry].state,
                stateName: stateName
            })
        }
    }
    res.render('representatives', {
        party: party,
        entries: entries
    });
})

app.get('/state/:name', function(req, res) {
     var state = req.params.name;
     var dems = [];
     var reps = [];
     for (entry in _DATA) {
        var stateName = "";
        for (stateb in abvMap) {
            if (abvMap[stateb] == _DATA[entry].state) {
                stateName = stateb;
                break;
            }
        }
        if (state === stateName) {
            if (_DATA[entry].party === "Democrat") {
                dems.push({name: _DATA[entry].person.name,
                           id: _DATA[entry].person.id
                });
            }
            if (_DATA[entry].party === "Republican") {
                reps.push({name: _DATA[entry].person.name,
                           id: _DATA[entry].person.id
                });
            }
        }
    }
    var demsExist = (dems.length > 0);
    var repsExist = (reps.length > 0);
    res.render('state', {
        state: state,
        dems: dems,
        demsExist: demsExist,
        reps: reps,
        repsExist: repsExist
    })
})

app.get('/rep', function(req, res) {
    var entries = [];
    for (entry in _DATA) {
        var stateName = "";
        for (state in abvMap) {
            if (abvMap[state] == _DATA[entry].state) {
                stateName = state;
                break;
            }
        }
        entries.push({
            repid: _DATA[entry].person.id,
            name: _DATA[entry].person.name,
            state: _DATA[entry].state,
            stateName: stateName
        })
    }
    res.render('representatives', {
        party: "All Representatives",
        entries: entries
    })
});

app.get('/rep/:repid', function(req, res) {
    var repid = req.params.repid;
    var entry = [];
    for (entry in _DATA) {
        var stateName = ""
        for (state in abvMap) {
            if (abvMap[state] == _DATA[entry].state) {
                stateName = state;
                break;
            }
        }
        if (repid == _DATA[entry].person.id) {
            res.render('person', {
                name: _DATA[entry].person.name,
                state: _DATA[entry].state,
                desc: _DATA[entry].description,
                party: _DATA[entry].party,
                bday: _DATA[entry].person.birthday,
                site: _DATA[entry].website,
                stateName: stateName
            });
        }
    }
});

app.listen(3000, function() {
    console.log('House of Representatives listening on port 3000!');
});
