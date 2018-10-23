const app = angular.module('my-app', []);
app.controller("ctrl", ['$scope', '$http', '$window', '$timeout', function ($scope, $http, $window, $timeout) {
    $scope.cities = $window.City;
    $scope.selectedCityId = null;
    $scope.categories = $window.Category.map((cat) => {
        cat.checked = false;
        return cat;
    });
    $scope.checkedCategory = null;
    $scope.checkCategory = (cat) => {
        cat.checked = !cat.checked;
    };

    $scope.cards = $window.Data;
    let minPrice;
    let maxPrice;
    snapSlider.noUiSlider.on('update', function (values) {
        $timeout(function () {
            minPrice = parseInt(values[0]);
            maxPrice = parseInt(values[1]);
        }, 0);
    });
    $scope.filteredByPrice = [];
    angular.copy($scope.cards, $scope.filteredByPrice);

    $scope.priceFilter = (values) => {
        $scope.filteredByPrice = values.filter((value) => {
            return value.price >= minPrice && value.price <= maxPrice
        });
    };
//work variant
//     $scope.priceFilter = (value) => {
//         return value.price >= minPrice && value.price <= maxPrice
//     };
//
    $scope.cityFilter = (value) => {
        return $scope.selectedCityId ? value.city === $scope.selectedCityId : true;
    };
    $scope.categoryFilter = (value) => {
        let checkedCategories = $scope.categories.filter((cat) => {
            return cat.checked;
        });
        if (checkedCategories.length === 0) {
            return true;
        }
        return checkedCategories.reduce((found, cat) => {
            return value.category === cat.id && cat.checked || found
        }, false)
    };

    $scope.categoryQty = (id) => {
        let count = 0;
        for (let i of $scope.cards) {
            if (id === i.category) count++;
        }
        return `(${count})`;
    };

    $scope.categoryName = (categoryId) => {
        for (let i of $scope.categories) {
            if (categoryId === i.id) {
                return i.name
            }
        }
    }
}]);

