// first, call the requires.js configs on config.js
requirejs( [ 'config' ], function ()
{

	requirejs( [ 'piano' ], function ( piano )
	{
		// initializing piano
		piano.start();
	} );

} );
