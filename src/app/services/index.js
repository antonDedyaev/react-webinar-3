export default async function loadArticle(id) {
  const response = await fetch(
    `/api/v1/articles/${id}?lang=all&fields=title,description,price,edition,madeIn(title,code),category(title)`
  );
  const json = await response.json();
  return json.result;
}
