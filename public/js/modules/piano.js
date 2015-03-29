define( function ()
{
	var Audio;
	
	requirejs(
	
		[ 'src/audiosynth' ],
		function ( audioSynth ) 
		{
			Audio = Synth.createInstrument('piano');
		}
	
	);
	
  return {

    // "data base"
    piano:
    {
      container:
      {
        htmlElement: 'section',
        theClassName: 'piano-container'
      },

      notes:
      {
        htmlElement: 'button',
        musicalNotes:
        {
          c: 'normal',
          cS: 'sharp',
          d: 'normal',
          dS: 'sharp',
          e: 'normal',
          f: 'normal',
          fS: 'sharp',
          g: 'normal',
          gS: 'sharp',
          a: 'normal',
          aS: 'sharp',
          b: 'normal'
        },
        text:
        {
          htmlElement: 'h1',
          theClassName: 'quote'
        }
      },
    },

    generate: function ()
    {
      var
        container = this.piano.container,
        notes = this.piano.notes,
        theContainer = document.createElement( container.htmlElement ),
        theNotes,
        i = 1,
        j = 1;

      for ( i; i <= 5; i++ )
      {
        Object.getOwnPropertyNames( notes.musicalNotes ).forEach( function ( value, index, array )
        {
          // creating button element
          theNotes = document.createElement( notes.htmlElement );
          // class that's receives number of note (0-61 by default)
          theNotes.classList.add( j + '-note');
          // class with note name
          theNotes.classList.add( notes.musicalNotes[ value ] );
          // class define if note is sharp or normal
          theNotes.classList.add( value );
          theContainer.appendChild( theNotes );
          j = j + 1;
        } );
      }

      theContainer.classList.add( container.theClassName );
      document.body.appendChild( theContainer );
    },

    use: function ()
    {
      var
        text = this.piano.notes.text;
      // all notes buttons
      note = document.querySelectorAll( '[class*="-note"]' ),
        // text with note name will be displayed
        textContainer = document.createElement( text.htmlElement ),
        i = 0;

      for ( i; i < note.length; i++ )
      {
        note[ i ].addEventListener( 'click', function ()
        {
          thatNote( this );
					playSound( this );
					console.log(this);
        } );
      }
			
			var playSound = function ( theNote ) 
			{
				
				var note,
						octave,
						numberNote,
						duration;
						
				note = theNote.classList[2].toUpperCase();
				if (note[1] == 'S') 
				{
					note = note[0] + '#';
				}
				numberNote = parseInt( theNote.classList[0] );
				octave = parseInt( (numberNote / 13)  ) + 3;
				console.log(octave);
				duration = 4;
				
				Synth.setVolume(1.0);
				
				Audio.play(note, octave, duration);

			}
      var thatNote = function ( theNote )
      {
        var
          pianoContainer = document.querySelector( '.piano-container' ),
          theTextNode,
          theText;
        textContainer.style.display = 'block';
        // test to convert, for example, cS -> c#
        if ( theNote.classList[ 1 ] == 'sharp' )
        {
          theTextNode = theNote.classList[ 2 ][ 0 ] + '#';
        }
        else
        {
          theTextNode = theNote.classList[ 2 ][ 0 ];
        }

        theText = document.createTextNode( theTextNode.toUpperCase() );
				
        if ( textContainer.hasChildNodes() )
        {
          textContainer.replaceChild( theText, textContainer.childNodes[ 0 ] );
        }
        else
        {
          textContainer.appendChild( theText );
        }
        setTimeout( function ()
        {
          textContainer.style.display = 'none';
        }, 500 );
        textContainer.classList.add( text.theClassName );
        pianoContainer.appendChild( textContainer );
      };
    },

    start: function ()
    {
      this.generate();
      this.use();
    }

  };
} );
