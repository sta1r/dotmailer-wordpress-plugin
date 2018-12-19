
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const el = wp.element.createElement;
const Components = wp.components;
var $ = require('jQuery');
import { SelectControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';
var Fragment = wp.element.Fragment,
    RichText = wp.editor.RichText,
    BlockControls = wp.editor.BlockControls,
	AlignmentToolbar = wp.editor.AlignmentToolbar;
	
	const BasicSvg = () =>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8m0 13.21A5.21 5.21 0 1 1 13.21 8 5.22 5.22 0 0 1 8 13.21" fill="#80c342"/><path d="M8 2.79A5.21 5.21 0 1 0 13.21 8 5.22 5.22 0 0 0 8 2.79z" fill="#fff"/><path d="M10.05 8A2.05 2.05 0 1 1 8 6a2.05 2.05 0 0 1 2.05 2" fill="#ec008b"/></svg>

registerBlockType( 'cgb/block-dd-block', {
	title: __( 'dd-block - Dotdigital Block' ), 
	icon: BasicSvg, 
	category: 'common',
	keywords: [
		__( 'dd-block — Dotdigital Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' )
	],
	attributes: {
		id: {
			type: 'string',
		}
    },

    edit: function( props ) {
        var id = props.attributes.id || '',
			focus = props.focus;
		var retval = [];
        	const MySelectControl = () => (
        		<SelectControl
					label={ __( 'Select a survey:' ) }
					value={ id } 
					onChange={ (survey) =>props.setAttributes({
						id: survey
					})}
					options={ [
							{ value: 'return false', label: '-- Please select --'},
							{ value: "https://r1.dotmailer-surveys.com/204mlv7a-9e3jrsda", label: 'Survey 1' },
							{ value: "https://r1.dotmailer-surveys.com/204mlv7a-8a3jrt2e", label: 'Survey 2' },
							{ value: "https://r1.dotmailer-surveys.com/204mlv7a-9e3jrsda", label: 'Survey 3' },
					] }
					/>
			);
            retval.push(
                 el( MySelectControl )
			);
			retval.push(
				React.createElement(
					'div',
					{ 'id': 'survey-container' }
				, Fragment)
			);
			if(props.attributes.id) {
				let html = '<p>Survey will load here</p>';
				let urlStr = props.attributes.id;
				let valid = (urlStr.match(/(http|https):\/\/([a-z0-9-.]+\/)([0-9a-z-]+)/i) !== null);
				if(valid) { html = '<iframe frameBorder="0" src="'+props.attributes.id+'"></iframe>'; }
				$('#survey-container').html(html);
			}
			
        return retval;
	},

	save: function( props ) {
		let urlStr = props.attributes.id;
		let valid = (urlStr.match(/(http|https):\/\/([a-z0-9-.]+\/)([0-9a-z-]+)/i) !== null);
		console.log(valid);
		if(valid) {
			return (
				<iframe frameBorder="0" src={props.attributes.id}></iframe>
			);
		} else {
			return (<p>Survey will load here</p>);
		}
	}
} );
