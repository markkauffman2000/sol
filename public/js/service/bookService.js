angular.module( "bookService", [] )

.factory( "bookService", function( $http )
{
  return {
    getBook : function( id )
    {
      return $http.get( "/api/books/" + id );
    },
    getBooks : function()
    {
      return $http.get( "/api/books" );
    },
    createBook : function( bookData )
    {
      return $http.post( "/api/books", bookData );
    },
    updateBook : function( bookData )
    {
      return $http.put( "/api/books", bookData );
    },
    deleteBook : function( id )
    {
      return $http.delete( "/api/books/" + id );
    },
    searchBooks : function( searchType, searchTerm )
    {
      return $http.get( "/api/books/search/" + searchType + "?searchTerm=" + searchTerm );
    },
  }
} );