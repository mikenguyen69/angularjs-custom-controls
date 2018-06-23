angular.module("app").factory("UserService", UserService);

function UserService ($q) {
  return {
    getElement: getElement,
  }
  
  function getElement () {
    return $q.when(
      {
        firstName: "Mike",
        middleName: "",
        surname: "Nguyen",
      }
    );
  }
}