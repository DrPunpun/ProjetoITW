$('document').ready(function () {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var url = location.hash;
        var list_ids = url.split('/');
        var fifa_id = list_ids.pop();
        var id = list_ids.pop();
        document.getElementById('teamImage').src = 'https://cdn.sofifa.org/18/teams/' + fifa_id + '.png';
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/teams/seasons/' + id;
        self.error = ko.observable();
        self.teamInfo = ko.observableArray([]);
        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }
        getInfo = function () {
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.teamInfo(data);
            });
        };
        getInfo()
    }
    ko.applyBindings(new vm)
})