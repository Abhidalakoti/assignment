import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase.js'
const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function Register(props) {
	const { classes } = props

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [quote, setQuote] = useState('')
    const [age, setAge] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [city, setCity] = useState('')
    const [dob, setDob] = useState('')
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register Account
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Name</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
					</FormControl>
                    <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="age">Age</InputLabel>
						<Input id="age" name="age" type="text" autoComplete="off" autoFocus value={age} onChange={e => setAge(e.target.value)} />
					</FormControl>
                    <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="bloodgroup">Blood Group</InputLabel>
						<Input id="bloodgroup" name="bloodgroup" autoComplete="off" autoFocus value={bloodgroup} onChange={e => setBloodgroup(e.target.value)} />
					</FormControl>
                    <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="city">City</InputLabel>
						<Input id="city" name="city" type="text" autoComplete="off" autoFocus value={city} onChange={e => setCity(e.target.value)} />
					</FormControl>
                    <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="dob">DOB</InputLabel>
						<Input id="dob" name="dob" type="text" autoComplete="off" autoFocus value={dob} onChange={e => setDob(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" type="text" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="quote">Your Favorite Quote</InputLabel>
						<Input name="quote" type="text" id="quote" autoComplete="off" value={quote} onChange={e => setQuote(e.target.value)}  />
					</FormControl>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onRegister}
						className={classes.submit}>
						Register
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/login"
						className={classes.submit}>
						Go back to Login
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function onRegister() {
		try {
			await firebase.register(name, age, bloodgroup, city, dob, email, password)
		    await firebase.addQuote(quote)
			props.history.replace('/dashboard')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(withStyles(styles)(Register))