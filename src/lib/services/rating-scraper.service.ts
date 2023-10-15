import fetch from "node-fetch";

const profileURL = "https://ratings.fide.com/profile";
const ratingRegex = /<div class="profile-top-rating-data profile-top-rating-data_gray">\s*<span class="profile-top-rating-dataDesc">std<\/span>\s*(?<rating>\d+)/;

export async function fetchRating(fideId: number) {
  try {
    const response = await fetch(`${profileURL}/${fideId}`);
    const data = await response.text();
    const matchArr = data.match(ratingRegex);

    if (!matchArr?.groups) return null;
    return +matchArr.groups.rating;
  } catch {
    return null;
  }
}