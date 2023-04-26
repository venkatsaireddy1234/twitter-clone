import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";


export default function signin({ providers}) {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      <Image 
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image inside a phone"
        className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
        width={1000}
        height={1000}
      />
      <div className="">
        { providers && Object.values(providers).map(provider=>(
          <div className="flex flex-col items-center" key={provider.id}>
            <Image
              className="w-36 "
              src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
              alt="twitter logo"
              width={36}
              height={100}
              />
            <p className="text-center text-sm italic my-10">
              This app is created for learning purposes
            </p>
            <button
            onClick={()=>signIn(provider.id, {callbackUrl:"/"})}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
              Sign in with {provider.name}
            </button>
          </div>
            ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}


// import { db } from "../../firebase";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
// import { useRouter } from "next/router";
// export default function Signin() {
//   const router = useRouter();
//   const onGoogleClick = async () => {
//     try {
//       const auth = getAuth();
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//       const user = auth.currentUser.providerData[0];
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (!docSnap.exists()) {
//         await setDoc(docRef, {
//           name: user.displayName,
//           email: user.email,
//           username: user.displayName.split(" ").join("").toLocaleLowerCase(),
//           userImg: user.photoURL,
//           uid: user.uid,
//           timestamp: serverTimestamp(),
//         });
//       }
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="flex justify-center mt-20 space-x-4">
//       <img
//         src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
//         alt="twitter image inside a phone"
//         className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
//       />
//       <div className="">
//         <div className="flex flex-col items-center">
//           <img
//             className="w-36 object-cover"
//             src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
//             alt="twitter logo"
//           />
//           <p className="text-center text-sm italic my-10">
//             This app is created for learning purposes
//           </p>
//           <button
//             onClick={onGoogleClick}
//             className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
//           >
//             Sign in with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
