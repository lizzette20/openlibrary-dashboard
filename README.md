# Web Development Project 5 - The Reading Room 📚

Submitted by: Lizzette Rivera

This web app: lets users explore book data from the OpenLibrary API. Users can search for books by title or author, view stats about the results, and filter them by subject and publication year. The app is responsive, aesthetic, and built with React.

Time spent: 4

---

## ✅ Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 10 unique items, one per row
  - Each row includes title, author, and optional book cover
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - Total books found
  - Average publish year (mean)
  - Most common subject (mode, or fallback if no subjects found)
- [x] **A search bar allows the user to search for an item in the fetched data**
  - Filters by title or author
  - Results update dynamically as the user types
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - Dropdown filters by subject
  - Year range filter allows specific bounds
  - Filters apply together, and results update live

---

## 💎 Optional + Extra Features

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types (dropdown, number inputs)
- [x] The user can enter specific bounds for filter values
- [x] Loading spinner in search bar when API is called
- [x] Custom empty state message when no results match

---

## 📹 Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='100%' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/) on macOS

---

## 📝 Notes

This was a super fun project to style and customize  
Biggest challenges were:
- Getting subject filters to work correctly from OpenLibrary’s data (we had to use 'subject' not 'subject_facet')
- Styling the layout to stay centered and organized even when there were no search results

---

## 🪪 License

```text
MIT License (or Apache if required by the course)
