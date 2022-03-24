import React, { useEffect, useState } from "react";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  Firestore,
  doc,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, getUserDocFromUid } from "../firebase";

function GetUserData({ uid }) {
  const [value, loading, error] = useDocumentData(doc(db, "users", uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      {value && (
        <p className="font-xl font-bold text-slate-600">
          Your best Score: {value.bestScore}
        </p>
      )}
    </div>
  );
}

export default GetUserData;
