"use client";

import Error from "next/error";

export default function GlobalError({ error }) {
  return (
    <html>
      <body>
        <Error statusCode={500} title={error?.message || "Something went wrong"} />
      </body>
    </html>
  );
}
