function AppController(UserService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
        $ctrl.element = {};
    }

    $ctrl.updateModel = function (key, newValue) {
        $ctrl.element[key] = newValue;
    }

    $ctrl.onSubmit = function () {
        alert(JSON.stringify($ctrl.element));
    }

    $ctrl.load = function () {
        UserService.getElement().then(function bindElement(element) {
            $ctrl.element = element;
        });
    }
}

function raAppComponent() {
    return {
        templateUrl: "components/sample-app/sample-app.component.html",
        controller: AppController,
        bindings: {
        }
    };
}

angular.module("app").component("raApp", raAppComponent());