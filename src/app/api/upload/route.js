const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return Response.json(
        { success: false, message: "No image file provided." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { success: false, message: "Image must be smaller than 5MB." },
        { status: 413 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        { success: false, message: "Please upload an image file." },
        { status: 400 }
      );
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return Response.json(
        { success: false, message: "Upload is not configured on the server." },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageBase64 = buffer.toString("base64");

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ key: apiKey, image: imageBase64 }),
    });

    const json = await res.json();

    if (!res.ok || !json?.data?.url) {
      return Response.json(
        {
          success: false,
          message: json?.error?.message || "Image upload failed. Try again.",
        },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      url: json.data.url,
      display_url: json.data.display_url,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}