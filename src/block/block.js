
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const el = wp.element.createElement;
const Components = wp.components;
var $ = require('jQuery');
var tools = require('./tools.js');
import { SelectControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';

registerBlockType( 'cgb/block-dd-block', {
	title: __( 'dd-block - Dotdigital Block' ), 
	icon: 'shield', 
	category: 'common',
	keywords: [
		__( 'dd-block — Dotdigital Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		id: {
			type: 'string',
		}
	},
    edit: function( props ) {
		dotsurvey.externalConnectionTest();
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
				)
			);
			if(props.attributes.id) {
				$('#survey-container').html('<iframe onload="dotsurvey.resizeIframe(this)" src="'+props.attributes.id+'"></iframe>');
			}
			
        return retval;
	},

	save: function( props ) {
		return (
			<div>
				<p>— Hello from the frontend.</p>
				<p>
		Dotdigital block: <code>dd-block</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
} );
