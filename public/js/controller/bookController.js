var app = angular.module( "bookController", [] )

app.constant("moment", moment);

app.controller( "bookController", function( $scope, bookService, moment )
{
  $scope.addAlert = function( type, message )
  {
    var alert = {};
    alert.type = type;
    alert.msg = message;
    
    $scope.alerts.push( alert );
  };

  $scope.closeAlert = function( index )
  {
    $scope.alerts.splice( index, 1 );
  };

  $scope.setView = function( view )
  {
    $scope.view = view;
  }
  
  $scope.getBooks = function()
  {
    var response = bookService.getBooks();

    response.success( function( data, status, headers, config )
    {
      $scope.books = data;
    } );

    response.error( function( data, status, headers, config )
    {
      $scope.error.status = status
      $scope.error.message = data;
    } );

    $scope.book = {};
    $scope.view = "showSearch";
  };

  $scope.selectBook = function( id )
  {
    var response = bookService.getBook( id );

    response.success( function( data, status, headers, config )
    {
      $scope.book = data;
      
      $scope.book.image = "http://www0.alibris-static.com/isbn/" + $scope.book.isbn.replace( "-", "" ) + "_l.jpg";
      
      // update the book record in the book list
      for ( i=0; i<$scope.books.length; i++ )
      {
        if ( $scope.books[i]._id == $scope.book._id)
        {
          $scope.books[i] = $scope.book;
        }
      }
    } );

    response.error( function( data, status, headers, config )
    {
      $scope.addAlert( "danger", status + " - " + data );
      $scope.book = {};
    } );

    $scope.view = "showDetails";
  };

  $scope.editBook = function()
  {
    var response = bookService.updateBook( $scope.book );

    response.success( function( data, status, headers, config )
    {
      $scope.addAlert( "success", "Book '" + $scope.book.title + "' updated." );
      $scope.getBooks();
    } );

    response.error( function( data, status, headers, config )
    {
      $scope.addAlert( "danger", status + " - " + data );
    } );
  };

  $scope.createBook = function()
  {
    var response = bookService.createBook( $scope.book );

    response.success( function( data, status, headers, config )
    {
      $scope.addAlert( "success", "Book '" + $scope.book.title + "' created." );
      $scope.getBooks();
    } );

    response.error( function( data, status, headers, config )
    {
      $scope.addAlert( "danger", status + " - " + data );
    } );
  };

  $scope.deleteBook = function( id )
  {
    var response = bookService.deleteBook( id );

    response.success( function( data, status, headers, config )
    {
      $scope.addAlert( "success", "Book '" + id + "' deleted." );
      $scope.getBooks();
    } );

    response.error( function( data, status, headers, config )
    {
      $scope.addAlert( "danger", status + " - " + data );
    } );
  };

  $scope.searchBooks = function()
  {
    // is the search term is undefined, return all books
    if ( !$scope.search.term || $scope.search.term.trim() == "" )
    {
      $scope.getBooks();
      return;
    }
    
    var response = bookService.searchBooks( $scope.search.type, $scope.search.term );

    response.success( function( data, status, headers, config )
    {
      if ( data.length == 0 )
      {
        $scope.addAlert( "info", "No results found for search type '" + $scope.search.type + "' and criteria '" + $scope.search.term + "'.");
      }
      $scope.books = data;
    } );

    response.error( function( data, status, headers, config )
    {
      $scope.addAlert( "danger", status + " - " + data );
    } );

    $scope.book = {};
    $scope.view = "showSearch";
  };
  
  $scope.book = {};
  $scope.search = {};
  $scope.alerts = [];
  $scope.search.type = "author";
  $scope.view = "showMenu";  
} )
.directive("bbDateFormat", function ()
{
  return { require : "ngModel", restrict : "A", link : function( scope, element, attributes, controller )
  {
    controller.$formatters.push( function( modelValue )
    {
      if ( !modelValue )
      {
        return;      
      }

      return moment( modelValue ).format( attributes.bbDateFormat );
    } );

    controller.$parsers.push( function( viewValue )
    {
      if ( !viewValue )
      {
        return;      
      }

      var date = moment( viewValue, attributes.bbDateFormat );
      
      return ( date && date.isValid() ) ? date.toDate() : null;
    } );
  } };
});
