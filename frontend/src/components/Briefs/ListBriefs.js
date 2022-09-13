import React from "react";
import { connect } from "react-redux";
import { fetchBriefs, fetchPrivateBriefs } from "../../actions";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import BriefCard from "./BriefCard";

//mui
import { Grid, Tabs, Tab, Fab } from "@mui/material";
import { Public, Lock, AccountBox, Add } from "@mui/icons-material";

class ListBriefs extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 0 };
	}
	componentDidMount() {
		this.props.fetchBriefs({ open: true, private: false });
	}

	onYourBriefsClick = () => {
		this.props.fetchBriefs({ author: this.props.userId });
	};

	onAllBriefsClick = () => {
		this.props.fetchBriefs({ open: true, private: false });
	};

	onPrivateBriefsClick = () => {
		this.props.fetchPrivateBriefs(this.props.userId);
	};

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	render() {
		if (!this.props.briefs) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return (
				<>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						aria-label="icon label tabs example"
						textColor="secondary"
						indicatorColor="secondary"
						centered
						sx={{ margin: 1 }}
					>
						<Tab
							icon={<Public />}
							onClick={() => this.onAllBriefsClick()}
							label="ALL PUBLIC BRIEFS"
						/>
						<Tab
							icon={<Lock />}
							onClick={() => this.onPrivateBriefsClick()}
							label="PRIVATE BRIEFS"
						/>
						<Tab
							icon={<AccountBox />}
							onClick={() => this.onYourBriefsClick()}
							label="YOUR BRIEFS"
						/>
					</Tabs>
					<Fab
						variant="extended"
						component={Link}
						to="/create-brief"
						color="secondary"
						aria-label="add"
						sx={{ m: 1, mb: 5 }}
					>
						<Add sx={{ mr: 1 }} />
						New Brief
					</Fab>
					<Grid
						container
						spacing={{ xs: 1, md: 2 }}
						columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
						justifyContent="space-evenly"
					>
						{this.props.briefs.map((brief) => (
							<Grid item xs={1} sm={1} md={1} key={brief._id}>
								<BriefCard key={brief._id} brief={brief} />
							</Grid>
						))}
					</Grid>
				</>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		briefs: Object.values(state.briefs),
	};
};

export default connect(mapStateToProps, { fetchBriefs, fetchPrivateBriefs })(
	ListBriefs
);
