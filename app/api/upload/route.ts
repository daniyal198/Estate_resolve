import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/app/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const multipleFileEntries = formData.getAll("files");
    const singleFileEntry = formData.get("file");
    const caseReference = formData.get("caseReference");
    const fileEntries =
      multipleFileEntries.length > 0 ? multipleFileEntries : [singleFileEntry];
    const files = fileEntries.filter((entry): entry is File => entry instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: "No files were provided." }, { status: 400 });
    }

    const subfolder =
      typeof caseReference === "string" && caseReference.trim().length > 0
        ? caseReference.trim()
        : undefined;
    const urls: string[] = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file, { subfolder });
      urls.push(url);
    }

    return NextResponse.json({ success: true, url: urls[0], urls });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Document upload failed.",
      },
      { status: 500 },
    );
  }
}
