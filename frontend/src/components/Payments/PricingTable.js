import * as React from "react";

function PricingTable(props) {
	// Paste the stripe-pricing-table snippet in your React component
	return (
		<stripe-pricing-table
			pricing-table-id={props.pricingTableId}
			publishable-key={props.publishableKey}
			client-reference-id={props.clientReferenceId ?? null}
		></stripe-pricing-table>
	);
}

export default PricingTable;
