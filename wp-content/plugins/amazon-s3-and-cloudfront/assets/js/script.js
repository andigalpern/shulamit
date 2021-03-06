(function( $, as3cfModal ) {

	var savedSettings = {};
	var bucketNamePattern = /[^a-z0-9.-]/;

	var $tabs = $( '.as3cf-tab' );
	var $activeTab;

	/**
	 * Return the serialized string of the settings form
	 * excluding the bucket and region inputs as they get saved via AJAX
	 *
	 * @param string tab
	 *
	 * @returns {string}
	 */
	function serializedForm( tab ) {
		return $( '#' + tab + ' .as3cf-main-settings form' ).find( 'input:not(.no-compare)' ).serialize();
	}

	/**
	 * Set checkbox
	 *
	 * @param string checkbox_wrap
	 */
	function setCheckbox( checkbox_wrap ) {
		var $switch = $( '#' + checkbox_wrap );
		var $checkbox = $switch.find( 'input[type=checkbox]' );

		$switch.toggleClass( 'on' ).find( 'span' ).toggleClass( 'checked' );
		var switchOn = $switch.find( 'span.on' ).hasClass( 'checked' );
		$checkbox.attr( 'checked', switchOn ).trigger( 'change' );
	}

	as3cf.tabs = {
		/**
		 * Toggle settings tab
		 *
		 * @param string hash
		 * @param bool   persist_updated_notice
		 */
		toggle: function( hash, persist_updated_notice ) {
			$tabs.hide();
			$activeTab = $( '#tab-' + hash );
			$activeTab.show();
			$( '.nav-tab' ).removeClass( 'nav-tab-active' );
			$( 'a.nav-tab[data-tab="' + hash + '"]' ).addClass( 'nav-tab-active' );
			$( '.aws-main' ).attr( 'data-tab', hash );
			if ( $activeTab.attr( 'data-prefix' ) ) {
				as3cfModal.prefix = $activeTab.attr( 'data-prefix' );
			}
			if ( !persist_updated_notice ) {
				$( '.as3cf-updated' ).removeClass( 'show' );
			}
		}
	};

	/**
	 * Load bucket list
	 *
	 * @param bool forceUpdate
	 */
	function loadBucketList( forceUpdate ) {
		if ( 'undefined' === typeof forceUpdate ) {
			forceUpdate = false;
		}

		var $bucketList = $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-bucket-list' );
		var selectedBucket = $( '#' + as3cfModal.prefix + '-bucket' ).val();

		if ( false === forceUpdate && $bucketList.find( 'li' ).length > 1 ) {
			$( '.as3cf-bucket-list a' ).removeClass( 'selected' );
			$( '.as3cf-bucket-list a[data-bucket="' + selectedBucket + '"]' ).addClass( 'selected' );

			scrollToSelectedBucket();
			return;
		}

		$bucketList.html( '<li class="loading">' + $bucketList.attr( 'data-working' ) + '</li>' );

		var data = {
			action: as3cfModal.prefix + '-get-buckets',
			_nonce: window[ as3cfModal.prefix.replace( /-/g, '_' ) ].nonces.get_buckets
		};

		$.ajax( {
			url: ajaxurl,
			type: 'POST',
			dataType: 'JSON',
			data: data,
			error: function( jqXHR, textStatus, errorThrown ) {
				$bucketList.html( '' );
				showBucketError( as3cf.strings.get_buckets_error, errorThrown, 'as3cf-bucket-select' );
			},
			success: function( data, textStatus, jqXHR ) {
				$bucketList.html( '' );

				if ( typeof data[ 'success' ] !== 'undefined' ) {
					$( '.as3cf-bucket-error' ).hide();

					$( data[ 'buckets' ] ).each( function( idx, bucket ) {
						var bucketClass = bucket.Name === selectedBucket ? 'selected' : '';
						$bucketList.append( '<li><a class="' + bucketClass + '" href="#" data-bucket="' + bucket.Name + '"><span class="bucket"><span class="dashicons dashicons-portfolio"></span> ' + bucket.Name + '</span><span class="spinner"></span></span></a></li>' );
					} );

					scrollToSelectedBucket();
				} else {
					showBucketError( as3cf.strings.get_buckets_error, data[ 'error' ], 'as3cf-bucket-select' );
				}
			}
		} );
	}

	/**
	 * Scroll to selected bucket
	 */
	function scrollToSelectedBucket() {
		if ( !$( '.as3cf-bucket-list a.selected' ).length ) {
			return;
		}

		var offset = $( 'ul.as3cf-bucket-list li' ).first().position().top + 150;

		$( '.as3cf-bucket-list' ).animate( {
			scrollTop: $( 'ul.as3cf-bucket-list li a.selected' ).position().top - offset
		} );
	}

	/**
	 * Reset bucket modal
	 */
	function resetBucketModal() {
		var $bucketContainer = $( '.as3cf-bucket-container.' + as3cfModal.prefix );

		if ( false === $activeTab.hasClass( 'as3cf-has-bucket' ) || 'manual' === $( '#' + as3cfModal.prefix + '-bucket-select' ).val() ) {
			$bucketContainer.find( '.as3cf-bucket-manual' ).show().siblings().hide();
			$bucketContainer.find( '.bucket-actions.manual' ).show().siblings( '.bucket-actions' ).hide();
		} else {
			$bucketContainer.find( '.as3cf-bucket-select' ).show().siblings().hide();
			$bucketContainer.find( '.bucket-actions.select' ).show().siblings( '.bucket-actions' ).hide();

			loadBucketList();
		}

		$bucketContainer.find( '.as3cf-bucket-error' ).hide();

		// Reset manual select value
		var bucket = $( '#' + as3cfModal.prefix + '-bucket' ).val();
		$bucketContainer.find( '.as3cf-bucket-manual .as3cf-bucket-name' ).val( bucket );
	}

	/**
	 * Save manual bucket
	 */
	function saveManualBucket() {
		var $manualBucketForm = $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-manual-save-bucket-form' );
		var $manualBucketInput = $manualBucketForm.find( '.as3cf-bucket-name' );
		var $manualBucketButton = $manualBucketForm.find( 'button[type=submit]' );
		var bucketName = $manualBucketInput.val();
		var originalBucketText = $manualBucketButton.first().text();

		if ( bucketName === $( '#' + as3cfModal.prefix + '-active-bucket' ).text() ) {
			$( '.as3cf-bucket-error' ).hide();
			$activeTab.addClass( 'as3cf-has-bucket' );
			as3cfModal.close();
			return;
		}
		$( '.as3cf-bucket-error' ).hide();
		$manualBucketButton.text( $manualBucketButton.attr( 'data-working' ) );
		$manualBucketButton.prop( 'disabled', true );

		var data = {
			action: as3cfModal.prefix + '-manual-save-bucket',
			bucket_name: bucketName,
			_nonce: window[ as3cfModal.prefix.replace( /-/g, '_' ) ].nonces.manual_bucket
		};

		$.ajax( {
			url: ajaxurl,
			type: 'POST',
			dataType: 'JSON',
			data: data,
			error: function( jqXHR, textStatus, errorThrown ) {
				$manualBucketButton.text( originalBucketText );
				showBucketError( as3cf.strings.save_bucket_error, errorThrown, 'as3cf-bucket-manual' );
			},
			success: function( data, textStatus, jqXHR ) {
				$manualBucketButton.text( originalBucketText );
				$manualBucketButton.prop( 'disabled', false );
				if ( typeof data[ 'success' ] !== 'undefined' ) {
					bucketSelect( bucketName, data[ 'region' ], data[ 'can_write' ] );
					$( '#' + as3cfModal.prefix + '-bucket-select' ).val( 'manual' );
					$( '.as3cf-bucket-list a' ).removeClass( 'selected' ).filter( '[data-bucket=' + bucketName + ']' ).addClass( 'selected' );
				} else {
					showBucketError( as3cf.strings.save_bucket_error, data[ 'error' ], 'as3cf-bucket-manual' );
				}
			}
		} );
	}

	/**
	 * Save select bucket
	 *
	 * @param object $link
	 */
	function saveSelectBucket( $link ) {
		var $bucketList = $( '.as3cf-bucket-list' );

		if ( $link.hasClass( 'selected' ) ) {
			$activeTab.addClass( 'as3cf-has-bucket' );
			as3cfModal.close();
			return;
		}

		var previousBucket = $( '.as3cf-bucket-list a.selected' ).attr( 'data-bucket' );

		$( '.as3cf-bucket-list a' ).removeClass( 'selected' );
		$link.addClass( 'selected' );

		$bucketList.addClass( 'saving' );
		$link.find( '.spinner' ).show().css( 'visibility', 'visible' );
		var bucketName = $link.attr( 'data-bucket' );

		var data = {
			action: as3cfModal.prefix + '-save-bucket',
			bucket_name: bucketName,
			_nonce: window[ as3cfModal.prefix.replace( /-/g, '_' ) ].nonces.save_bucket
		};

		$.ajax( {
			url: ajaxurl,
			type: 'POST',
			dataType: 'JSON',
			data: data,
			error: function( jqXHR, textStatus, errorThrown ) {
				$bucketList.removeClass( 'saving' );
				showBucketError( as3cf.strings.save_bucket_error, errorThrown, 'as3cf-bucket-select' );
				$( '.as3cf-bucket-list a' ).removeClass( 'selected' );
				$( '.as3cf-bucket-list a[data-bucket="' + previousBucket + '"]' ).addClass( 'selected' );
			},
			success: function( data, textStatus, jqXHR ) {
				$link.find( '.spinner' ).hide().css( 'visibility', 'hidden' );
				$bucketList.removeClass( 'saving' );
				if ( typeof data[ 'success' ] !== 'undefined' ) {
					bucketSelect( bucketName, data[ 'region' ], data[ 'can_write' ] );
					$( '#' + as3cfModal.prefix + '-bucket-select' ).val( '' );
				} else {
					showBucketError( as3cf.strings.save_bucket_error, data[ 'error' ], 'as3cf-bucket-select' );
					$( '.as3cf-bucket-list a' ).removeClass( 'selected' );
					$( '.as3cf-bucket-list a[data-bucket="' + previousBucket + '"]' ).addClass( 'selected' );
				}
			}
		} );
	}

	/**
	 * Disable bucket buttons
	 */
	function disableBucketButtons() {
		if ( 0 === $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-create-bucket-form' ).length ) {
			return;
		}

		var $createBucketForm = $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-create-bucket-form' );
		var $manualBucketForm = $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-manual-save-bucket-form' );

		if ( $createBucketForm.find( '.as3cf-bucket-name' ).val().length < 3 ) {
			$createBucketForm.find( 'button[type=submit]' ).attr( 'disabled', true );
		}
		else {
			$createBucketForm.find( 'button[type=submit]' ).attr( 'disabled', false );
		}

		if ( $manualBucketForm.find( '.as3cf-bucket-name' ).val().length < 3 ) {
			$manualBucketForm.find( 'button[type=submit]' ).attr( 'disabled', true );
		}
		else {
			$manualBucketForm.find( 'button[type=submit]' ).attr( 'disabled', false );
		}
	}

	/**
	 * Show bucket error
	 *
	 * @param title
	 * @param error
	 * @param context
	 */
	function showBucketError( title, error, context ) {
		var $activeView = $( '.as3cf-bucket-container' ).children( ':visible' );
		var $bucketError = $activeView.find( '.as3cf-bucket-error' );

		context = ( 'undefined' === typeof context ) ? null : context;

		if ( context && ! $activeView.hasClass( context ) ) {
			return;
		}

		$bucketError.find( 'span.title' ).html( title );
		$bucketError.find( 'span.message' ).html( error );
		$bucketError.show();
	}

	/**
	 * Select bucket
	 *
	 * @param string title
	 * @param string error
	 * @param bool   canWrite
	 */
	function bucketSelect( bucket, region, canWrite ) {
		var $manualBucketForm = $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-manual-save-bucket-form' );
		var $activeBucket = $( '#' + as3cfModal.prefix + '-active-bucket' );

		if ( 'as3cf' === as3cfModal.prefix && '' === $activeBucket.text() ) {
			// first time bucket select - enable main options by default
			setCheckbox( 'copy-to-s3-wrap' );
			setCheckbox( 'serve-from-s3-wrap' );
		}

		$activeBucket.text( bucket );
		$manualBucketForm.find( '.as3cf-bucket-name' ).val( bucket );
		$( '#' + as3cfModal.prefix + '-bucket' ).val( bucket );
		$( '#' + as3cfModal.prefix + '-region' ).val( region );
		$( '.updated' ).not( '.as3cf-notice' ).show();

		$activeTab.addClass( 'as3cf-has-bucket' );
		// check permission on bucket
		$activeTab.find( '.as3cf-can-write-error' ).toggle( !canWrite );
		$activeTab.find( '.as3cf-bucket-error' ).hide();

		if ( 'as3cf' === as3cfModal.prefix ) {
			generateUrlPreview();
		}

		as3cfModal.close();
	}

	/**
	 * Generate URL preview
	 */
	function generateUrlPreview() {
		$( '.as3cf-url-preview' ).html( 'Generating...' );

		var data = {
			_nonce: as3cf.nonces.get_url_preview
		};

		$.each( $( '#tab-media .as3cf-main-settings form' ).serializeArray(), function( i, o ) {
			var n = o.name,
				v = o.value;
			n = n.replace( '[]', '' );
			data[ n ] = data[ n ] === undefined ? v : $.isArray( data[ n ] ) ? data[ n ].concat( v ) : [ data[ n ], v ];
		} );

		// overwrite the save action stored in the form
		data[ 'action' ] = 'as3cf-get-url-preview';

		$.ajax( {
			url: ajaxurl,
			type: 'POST',
			dataType: 'JSON',
			data: data,
			error: function( jqXHR, textStatus, errorThrown ) {
				alert( as3cf.strings.get_url_preview_error + errorThrown );
			},
			success: function( data, textStatus, jqXHR ) {
				if ( typeof data[ 'success' ] !== 'undefined' ) {
					$( '.as3cf-url-preview' ).html( data[ 'url' ] );
				} else {
					alert( as3cf.strings.get_url_preview_error + data[ 'error' ] );
				}
			}
		} );
	}

	/**
	 * Check for a valid bucket name
	 *
	 * Bucket names must be at least 3 and no more than 63 characters long.
	 * They can contain lowercase letters, numbers, periods and hyphens.
	 *
	 * @param string bucketName
	 *
	 * @return bool
	 */
	function isValidBucketName( bucketName ) {
		if ( bucketName.length < 3 || bucketName.length > 63 ) {
			return false;
		}
		if ( true === bucketNamePattern.test( bucketName ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Update invalid bucket name notice
	 *
	 * @param string bucketName
	 */
	function updateBucketNameNotice( bucketName ) {
		var message = null;

		if ( true === bucketNamePattern.test( bucketName ) ) {
			message = as3cf.strings.create_bucket_invalid_chars;
		} else if ( bucketName.length < 3 ) {
			message = as3cf.strings.create_bucket_name_short;
		} else if ( bucketName.length > 63 ) {
			message = as3cf.strings.create_bucket_name_long;
		}

		if ( message && bucketName.length > 0 ) {
			$( '.as3cf-invalid-bucket-name' ).html( message );
		} else {
			$( '.as3cf-invalid-bucket-name' ).html( '' );
		}
	}

	/**
	 * Save create bucket
	 */
	function saveCreateBucket() {
		var $createBucketForm = $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-create-bucket-form' );
		var $createBucketInput = $createBucketForm.find( '.as3cf-bucket-name' );
		var $createBucketSelect = $createBucketForm.find( '.bucket-create-region' );
		var $createBucketButton = $createBucketForm.find( 'button[type=submit]' );

		var bucketName = $createBucketInput.val();
		var origButtonText = $createBucketButton.text();

		$( '.as3cf-bucket-error' ).hide();
		$createBucketButton.text( $createBucketButton.attr( 'data-working' ) );
		$createBucketButton.prop( 'disabled', true );

		var data = {
			action: as3cfModal.prefix + '-create-bucket',
			bucket_name: bucketName,
			_nonce: window[ as3cfModal.prefix.replace( /-/g, '_' ) ].nonces.create_bucket
		};

		if ( $createBucketSelect.val() ) {
			data[ 'region' ] = $createBucketSelect.val();
		}

		$.ajax( {
			url: ajaxurl,
			type: 'POST',
			dataType: 'JSON',
			data: data,
			error: function( jqXHR, textStatus, errorThrown ) {
				$createBucketButton.text( origButtonText );
				showBucketError( as3cf.strings.create_bucket_error, errorThrown, 'as3cf-bucket-create' );
			},
			success: function( data, textStatus, jqXHR ) {
				$createBucketButton.text( origButtonText );
				$createBucketButton.prop( 'disabled', false );
				if ( typeof data[ 'success' ] !== 'undefined' ) {
					bucketSelect( bucketName, data[ 'region' ], data[ 'can_write' ] );
					// tidy up create bucket form
					$( '.as3cf-bucket-select-region' ).hide();
					$( '.as3cf-bucket-select-region' ).removeAttr( 'selected' );
					$createBucketInput.val( '' );
					$createBucketButton.attr( 'disabled', true );
				} else {
					showBucketError( as3cf.strings.create_bucket_error, data[ 'error' ], 'as3cf-bucket-create' );
				}
			}
		} );
	}

	$( document ).ready( function() {

		// Tabs
		// --------------------

		// Move any compatibility errors below the nav tabs
		var $navTabs = $( '.wrap.aws-main .nav-tab-wrapper' );
		$( '.aws-compatibility-notice, div.updated, div.error, div.notice' ).not( '.below-h2, .inline' ).insertAfter( $navTabs );

		// check for hash in url and switch tabs accordingly
		if ( window.location.hash ) {
			var hash = window.location.hash.substring( 1 );
			as3cf.tabs.toggle( hash, true );
		} else {
			// default settings tab
			var defaultTab = 'media';
			$activeTab = $( '#tab-' + defaultTab );
			$( '.aws-main' ).attr( 'data-tab', defaultTab );
		}

		$( '.aws-main' ).on( 'click', '.nav-tab', function( e ) {
			e.preventDefault();
			if ( $( this ).hasClass( 'nav-tab-active' ) ) {
				return;
			}
			var nextTab = $( this ).attr( 'data-tab' );
			as3cf.tabs.toggle( nextTab );
			if ( 'media' === nextTab ) {
				// As it's the default remove the hash
				window.location.hash = '';
				if ( typeof window.history.replaceState === 'function' && '#' === window.location.href.slice( -1 ) ) {
					// Strip the # if still on the end of the URL
					history.replaceState( {}, '', window.location.href.slice( 0, -1 ) );
				}
			} else {
				window.location.hash = nextTab;
			}
		} );

		// Settings
		// --------------------

		// save the original state of the forms for comparison later
		if ( $tabs.length ) {
			$tabs.each( function( i, tab ) {
				savedSettings[ tab.id ] = serializedForm( tab.id );
			} );
		}

		// prompt user with dialog if leaving the settings page with unsaved changes
		$( window ).on( 'beforeunload.as3cf-settings', function() {
			if ( $.isEmptyObject( savedSettings ) ) {
				return;
			}

			var tab = $activeTab.attr( 'id' );

			if ( serializedForm( tab ) !== savedSettings[ tab ] ) {
				return as3cf.strings.save_alert;
			}
		} );

		// let the save settings submit happen as normal
		$( document ).on( 'submit', '.as3cf-main-settings form', function( e ) {
			// disable unload warning
			$( window ).off( 'beforeunload.as3cf-settings' );
		} );

		$( '.as3cf-switch' ).on( 'click', function( e ) {
			if ( !$( this ).hasClass( 'disabled' ) ) {
				setCheckbox( $( this ).attr( 'id' ) );
			}
		} );

		$tabs.on( 'change', '.sub-toggle', function( e ) {
			var setting = $( this ).attr( 'id' );
			$( '.as3cf-setting.' + setting ).toggleClass( 'hide' );
		} );

		$( '.as3cf-domain' ).on( 'change', 'input[type="radio"]', function( e ) {
			var $selected = $( this ).closest( 'input:radio[name="domain"]:checked' );
			var domain = $selected.val();
			var $cloudfront = $( this ).parents( '.as3cf-domain' ).find( '.as3cf-setting.cloudfront' );
			var cloudfrontSelected = ( 'cloudfront' === domain );
			$cloudfront.toggleClass( 'hide', !cloudfrontSelected );
		} );

		$( '.as3cf-ssl' ).on( 'change', 'input[type="radio"]', function( e ) {
			var ssl = $( 'input:radio[name="ssl"]:checked' ).val();
			if ( 'https' === ssl ) {
				var domain = $( 'input:radio[name="domain"]:checked' ).val();
				if ( 'subdomain' === domain ) {
					$( 'input[name="domain"][value="path"]' ).attr( "checked", true );
				}
				$( '.subdomain-wrap input' ).attr( 'disabled', true );
				$( '.subdomain-wrap' ).addClass( 'disabled' );
			} else {
				$( '.subdomain-wrap input' ).removeAttr( 'disabled' );
				$( '.subdomain-wrap' ).removeClass( 'disabled' );
			}
		} );

		$( '.url-preview' ).on( 'change', 'input', function( e ) {
			generateUrlPreview();
		} );

		// Bucket select
		// --------------------

		// Move bucket errors
		$( '#tab-media > .as3cf-bucket-error' ).detach().insertAfter( '.as3cf-bucket-container h3' );

		// Action click handlers
		$( 'body' ).on( 'click', '.bucket-action-manual', function( e ) {
			e.preventDefault();
			$( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-bucket-manual' ).show().siblings().hide();
		} );
		$( 'body' ).on( 'click', '.bucket-action-browse', function( e ) {
			e.preventDefault();
			$( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-bucket-select' ).show().siblings().hide();

			loadBucketList();
		} );
		$( 'body' ).on( 'click', '.bucket-action-create', function( e ) {
			e.preventDefault();

			// Reset create bucket modal
			$( '.as3cf-bucket-name' ).val( '' );
			$( '.as3cf-invalid-bucket-name' ).html( '' );

			$( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-bucket-create' ).show().siblings().hide();
		} );
		$( 'body' ).on( 'click', '.bucket-action-cancel', function( e ) {
			e.preventDefault();
			resetBucketModal();
		} );
		$( 'body' ).on( 'click', '.bucket-action-save', function( e ) {
			e.preventDefault();
			saveManualBucket();
		} );
		$( 'body' ).on( 'click', '.as3cf-create-bucket-form button[type="submit"]', function( e ) {
			e.preventDefault();
			saveCreateBucket();
		} );

		// Bucket list refresh handler
		$( 'body' ).on( 'click', '.bucket-action-refresh', function( e ) {
			e.preventDefault();
			loadBucketList( true );
		} );

		// Bucket list click handler
		$( 'body' ).on( 'click', '.as3cf-bucket-list a', function( e ) {
			e.preventDefault();
			saveSelectBucket( $( this ) );
		} );

		// Modal open
		$( 'body' ).on( 'as3cf-modal-open', function( e, target ) {
			if ( '.as3cf-bucket-container.' + as3cfModal.prefix === target ) {
				// Reset modal
				resetBucketModal();
				// Change manual title text
				var title = $( '.as3cf-bucket-manual h3' ).data( 'modal-title' );
				$( '.as3cf-bucket-manual h3' ).text( title );
				// Hide buttons
				disableBucketButtons();
			}
		} );
		disableBucketButtons();

		// Validate bucket name on create
		$( 'body' ).on( 'input keyup', '.as3cf-create-bucket-form .as3cf-bucket-name', function( e ) {
			var bucketName = $( this ).val();
			var $createBucketForm = $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-create-bucket-form' );

			if ( isValidBucketName( bucketName ) ) {
				$createBucketForm.find( 'button[type=submit]' ).removeAttr( 'disabled' );
			} else {
				$createBucketForm.find( 'button[type=submit]' ).attr( 'disabled', true );
			}
			updateBucketNameNotice( bucketName );
		} );

		// Check bucket name length on manual
		$( 'body' ).on( 'input keyup', '.as3cf-manual-save-bucket-form .as3cf-bucket-name', function( e ) {
			var $manualBucketForm = $( '.as3cf-bucket-container.' + as3cfModal.prefix + ' .as3cf-manual-save-bucket-form' );

			if ( $manualBucketForm.find( '.as3cf-bucket-name' ).val().length < 3 ) {
				$manualBucketForm.find( 'button[type=submit]' ).attr( 'disabled', true );
			} else {
				$manualBucketForm.find( 'button[type=submit]' ).removeAttr( 'disabled' );
			}
		} );

	} );

})( jQuery, as3cfModal );
