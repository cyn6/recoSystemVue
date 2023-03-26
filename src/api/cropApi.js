import request from "../utils/request";

export function uploadImage(img) {
  return request.post(
    "/upload",
    {
      image: img,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
}

// type: disease, insect, nutrition, status
export function getSingleResult(path, type) {
  return request.get("/crop", {
    params: {
      imagePath: path,
      detectType: type,
    },
  });
}
