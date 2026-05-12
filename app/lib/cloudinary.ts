import { uploadConstraints } from "@/app/lib/validation";

function getCloudinaryConfig() {
  const uploadUrl =
    process.env.CLOUDINARY_UPLOAD_URL ||
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
  const uploadPreset =
    process.env.CLOUDINARY_UPLOAD_PRESET ||
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
  const folder =
    process.env.CLOUDINARY_UPLOAD_FOLDER || "estate-resolve-documents";

  if (!uploadUrl) {
    throw new Error("Cloudinary upload URL is not configured.");
  }

  if (!uploadPreset) {
    throw new Error("Cloudinary upload preset is not configured.");
  }

  return { folder, uploadPreset, uploadUrl };
}

export function validateUploadFile(file: File) {
  if (!uploadConstraints.acceptedMimeTypes.includes(file.type as never)) {
    throw new Error("Only PDF, JPG, and PNG files are allowed.");
  }

  if (file.size > uploadConstraints.maxFileSizeBytes) {
    throw new Error("Each file must be 10MB or smaller.");
  }
}

type UploadOptions = {
  subfolder?: string;
};

function getFileStem(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  const rawStem = lastDotIndex > 0 ? fileName.slice(0, lastDotIndex) : fileName;

  return (
    rawStem
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "document"
  );
}

function normalizeFolderPath(baseFolder: string, subfolder?: string) {
  const safeBaseFolder = baseFolder.replace(/^\/+|\/+$/g, "");
  const safeSubfolder = subfolder?.replace(/^\/+|\/+$/g, "");

  if (!safeSubfolder) {
    return safeBaseFolder;
  }

  return `${safeBaseFolder}/${safeSubfolder}`;
}

export async function uploadToCloudinary(
  file: File,
  options: UploadOptions = {},
): Promise<string> {
  validateUploadFile(file);

  const { folder, uploadPreset, uploadUrl } = getCloudinaryConfig();
  const formData = new FormData();
  const folderPath = normalizeFolderPath(folder, options.subfolder);
  const fileStem = getFileStem(file.name);
  const uniqueSuffix = Math.random().toString(36).slice(2, 8);

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folderPath);
  formData.append("asset_folder", folderPath);
  formData.append("public_id", `${fileStem}-${uniqueSuffix}`);

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    error?: { message?: string };
    secure_url?: string;
  };

  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || "Cloudinary upload failed.");
  }

  return payload.secure_url;
}
