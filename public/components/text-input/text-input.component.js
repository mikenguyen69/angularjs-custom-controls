angular
    .module("app")
    .component("raTextInput", raTextInputComponent());

function InputController($window, $document, $timeout) {
    var $ctrl = this;
    var sizes = {
        'sm': 'form-group-sm',
        'lg': 'form-group-lg',
    };

    $ctrl.$onInit = function () {
        $ctrl.elementId = $window.angular.copy($ctrl.name);
    }

    $ctrl.$onChanges = function (changes) {
        if (changes.required) {
            $ctrl.isRequired = $ctrl.required === "true";
        }
        if (changes.submitted) {
            $ctrl.isFormSubmitted = !!$ctrl.submitted;
        }
        if (changes.value) {
            $ctrl.internalValue = $window.angular.copy($ctrl.value);
        }
        if (changes.helpText) {
            $ctrl.hasHelpText = typeof $ctrl.helpText === 'string' &&
                $ctrl.helpText.length > 0;
        }
        if (changes.size) {
            $ctrl.sizeClass = sizes[$ctrl.size];
        }
        if (changes.characterCounter) {
            $ctrl.hasCharacterCounter = $ctrl.characterCounter === "true";
        }
    }

    var domElement = undefined;
    $ctrl.$doCheck = function () {
        if (!$ctrl.hasCharacterCounter) {
            return;
        }
        if (!domElement) {
            if (!$ctrl.elementId) {
                return;
            }
            domElement = $document[0].querySelector('input[type=text]#' + $ctrl.elementId);
            if (!domElement) {
                return;
            }
        }
        var currentLength = domElement.value.length;
        if (currentLength !== $ctrl.currentLength) {
            $timeout(function _forceDigestToDisplayDataOnView() {
                $ctrl.currentLength = currentLength;
            });
        }
    };


    $ctrl.change = function () {
        $ctrl.onChange({
            name: $ctrl.name,
            value: $ctrl.internalValue,
        });
    }

    $ctrl.isNotValid = function () {
        return $ctrl.isFormSubmitted && (!$ctrl.form[$ctrl.name].$valid);
    }

    $ctrl.isValid = function () {
        return (!$ctrl.form[$ctrl.name].$pristine) && $ctrl.form[$ctrl.name].$valid;
    }
}

function raTextInputComponent() {
    return {
        templateUrl: "components/text-input/text-input.component.html",
        controller: InputController,
        bindings: {
            name: "@",
            label: "@",
            required: "@",
            minLength: "@",
            maxLength: "@",
            helpText: "@",
            size: "@",
            characterCounter: "@",
            value: "<",
            onChange: "&",
            form: "<",
            submitted: "<",
        },
    };
}

