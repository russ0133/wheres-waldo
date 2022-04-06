import React from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

interface GetUserDataNode {
  uid: string;
}
const GetUserData: React.FC<GetUserDataNode> = ({ uid }) => {
  const [value, loading, error] = useDocumentData(doc(db, "users", uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      {loading && (
        <p className="font-xl font-bold text-slate-600">Your best Score: ...</p>
      )}
      {value && (
        <p className="font-xl font-bold text-slate-600">
          Your best Score: {value.bestScore} seconds.
        </p>
      )}
    </div>
  );
};

export default GetUserData;
