export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET")

  const { link, emoji } = req.query

  if (!link || !emoji) {
    return res.status(400).json({
      success: false,
      error: "link & emoji wajib"
    })
  }

  try {
    const response = await fetch(
      `https://react.whyux-xec.my.id/api/rch?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(emoji)}`,
      {
        method: "GET",
        headers: {
          "x-api-key": "040f2f333ec598e6b0baba7b0e083d03598201f8dcf5818a662112368541580a",
          "Accept": "application/json"
        }
      }
    )

    const text = await response.text()

    // jaga-jaga kalau API ngirim bukan JSON
    let data
    try {
      data = JSON.parse(text)
    } catch {
      return res.status(500).json({
        success: false,
        error: "Response API bukan JSON",
        raw: text
      })
    }

    return res.status(200).json(data)

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Proxy fetch gagal",
      detail: err.message
    })
  }
}
