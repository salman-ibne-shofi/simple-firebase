import { useState } from "react";
import app from "../../firebase/firebase.init";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";

const Login = () => {
	const [user, setUser] = useState(null);
	const auth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const handleGoogleSignIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const loggedInUser = result.user;
				console.log(loggedInUser);
				setUser(loggedInUser);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSignOut = () => {
		signOut(auth)
			.then((result) => {
				console.log(result);
				setUser(null);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			{/* user ? logout : sign in */}

			{user ? (
				<button onClick={handleSignOut}>Sign out</button>
			) : (
				<button onClick={handleGoogleSignIn}>Google login</button>
			)}
			{user && (
				<div>
					<h2>User: {user.displayName}</h2>
					<p>User: {user.email}</p>
					<img src={user.photoURL} alt="" />
				</div>
			)}
		</div>
	);
};

export default Login;
