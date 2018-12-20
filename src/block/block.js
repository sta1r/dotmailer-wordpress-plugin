
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const el = wp.element.createElement;
const Components = wp.components;
var $ = require('jQuery');
var validUrlRegEx = /(http|https):\/\/([a-z0-9-.]+\/)([0-9a-z-]+)/i;
var surveys = [];

import { SelectControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';
import axios from 'axios';

 var dotsurvey = {
	 surveys: [],
	 getSurveyData: function()  {
		 var surveys = dotsurvey.surveys;
		axios.get('../wp-json/alastars/v1/surveys').then(function(output) {
				for (var key in output.data) 
				{ 
					surveys[key] = {};
					surveys[key].label = output.data[key].dm_name;
					surveys[key].value = output.data[key].url;
				}
		});
	 },
	 getSurveyList() {
		 console.log(dotsurvey.surveys);
		 return dotsurvey.surveys;
	 }
 }

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
		dotsurvey.getSurveyData();

		setTimeout(dotsurvey.getSurveyList, 1000);
		
		console.log(dotsurvey.surveys);
		var retval = [];


        	const MySelectControl = () => (
        		<SelectControl
					label={ __( 'Select a survey:' ) }
					value={ id } 
					onChange={ (survey) =>props.setAttributes({
						id: survey
					})}
					options={ dotsurvey.surveys }
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
				let valid = (props.attributes.id.match(validUrlRegEx) !== null);
				let html = (valid) ? '<iframe frameBorder="0" src="'+props.attributes.id+'"></iframe>': '';
				$('#survey-container').html(html);
			}
        return retval;
	},

	save: function( props ) {
		let valid = (props.attributes.id.match(validUrlRegEx) !== null);
		if(valid) { return ( <iframe frameBorder="0" src={props.attributes.id}></iframe> ); }
	}
} );
