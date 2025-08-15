/**
 * cd to 4-Exercises folder and then run "npx ts-node movies.ts"
 * Implement a class to add movies, create a watchlist and once watched then remove from the list and to watched.
 */

class Movies {
  title: string;
  rating: number | null;
  watchlist_queue: Array<string | number>[];
  watched_stack: Array<string | number>[];
  constructor(title: string, rating: number | null = null) {
    this.title = title;
    this.rating = rating;
    this.watchlist_queue = [];
    this.watched_stack = [];
  }
  addRating = (rating: number) => {
    this.rating = rating;
  };
  addToWatchlist = (title: string, rating: number) => {
    this.watchlist_queue.push([title, rating]);
  };
  watchMovie = () => {
    if (this.watchlist_queue.length > 0) {
      const movie: Array<string | number> = this.watchlist_queue.shift()!;
      this.watched_stack.push(movie);
    }
  };
  printWatchlist = () => {
    console.log("Movies in watchlist are: ");
    for (let i = 0; i < this.watchlist_queue.length; i++)
      console.log(
        `${i + 1}. ${this.watchlist_queue[i][0]} - ${
          this.watchlist_queue[i][1]
        }`
      );
  };
  printWatched = () => {
    console.log("Movies watched are: ");
    for (let i = 0; i < this.watched_stack.length; i++)
      console.log(
        `${i + 1}. ${this.watched_stack[i][0]} - ${this.watched_stack[i][1]}`
      );
  };
  toString = () => {
    console.log(`Movie title is ${this.title} and rating is ${this.rating}`);
  };
}

(() => {
  const movie = new Movies("MI - 1");
  movie.addRating(3);
  movie.toString();
  movie.addToWatchlist("MI - 2", 4);
  movie.addToWatchlist("MI - 3", 5);
  movie.printWatchlist();
  movie.watchMovie();
  movie.printWatchlist();
  movie.printWatched();
})();
