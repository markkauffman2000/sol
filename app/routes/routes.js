var book = require( "../model/book" );
var url = require( "url");

module.exports = function( app )
{
  app.get( "/api/books", function( request, response )
  {
    book.find( {} ).sort( { title: 1 } ).exec( function( error, books )
        {
          if ( error )
          {
            console.log( error );
            response.send( error )
          }
          response.json( books );
        } );
  } );

  app.get( "/api/books/:id", function( request, response )
  {
    book.findById( request.params.id, function( error, books )
    {
      if ( error )
      {
        console.log( error );
        response.send( error )
      }
      else
      {
        response.json( books );
      }
    } );
  } );

  app.put( "/api/books", function( request, response )
  {
    var updatedBook = { _id: request.body._id,
                        title : request.body.title,
                        author : request.body.author,
                        description : request.body.description,
                        isbn : request.body.isbn,
                        publicationDate : request.body.publicationDate,
                        price : request.body.price
                      };

    book.findByIdAndUpdate( request.body._id, updatedBook, function( error )
    {
      if ( error )
      {
        console.log( error );
        response.send( error );
      }
      
      response.status(200).end();
    } );
  } );

  app.post( "/api/books", function( request, response )
  {
    var newBook = { title : request.body.title,
                    author : request.body.author,
                    description : request.body.description,
                    isbn : request.body.isbn,
                    publicationDate : request.body.publicationDate,
                    price : request.body.price
                  };
    
    book.create( newBook, function( error, books )
    {
      if ( error )
      {
        console.log( error );
        response.send( error );
      }

      response.status(200).end();
    } );
  } );

  app.delete( "/api/books/:id", function( request, response )
  {
    book.remove( { _id : request.params.id }, function( error, books )
    {
      if ( error )
      {
        console.log( error );
        response.send( error );
      }

      response.status(200).end();
    } );
  } );

  app.get( "/api/books/search/:searchType", function( request, response )
  {
    var criteria = {};
    criteria[request.params.searchType] = new RegExp( ".*" + request.query.searchTerm + ".*", "i" );

    var sort = {};
    sort[request.params.searchType] = 1;

    book.find( criteria ).sort( sort ).exec( function( error, books )
    {
      if ( error )
      {
        console.log(error);
        response.send( error );
      }

      response.json( books );
    } );
  } );

  app.get( "/image/*", function( request, response )
  {
    var pathname = url.parse( request.url ).pathname;
    
    response.sendfile( pathname );
  } );

  app.get( "/css/*", function( request, response )
  {
    var pathname = url.parse( request.url ).pathname;
    
    response.sendfile( pathname );
  } );

  app.get( "/template/*", function( request, response )
  {
    var pathname = url.parse( request.url ).pathname;
    
    response.sendfile( pathname );
  } );

  app.get( "*", function( request, response )
  {
    var pathname = url.parse( request.url ).pathname;

    response.sendfile( "/index.html" );
  } );
};
