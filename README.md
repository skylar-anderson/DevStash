DevStash is a useful tool for expediting local development.
----------

Simply refer to the contents of the script after loading jQuery but before making any AJAX calls and you will begin being able to take snapshots.

After you have referred to the attached script you can take a snapshot using your browsers Javascript console:

    DevStash.capture(true);

The current page should then refresh.  All subsequent XHR requests will be recorded.

To begin using what is stored in cache, simply enter the following in your JS console:

    DevStash.load(true);
  
  
  
Both DevStash.snapshot() and DevStash.load receive an optional parameter 'debug' which dictates whether to output to the browser console or not.
