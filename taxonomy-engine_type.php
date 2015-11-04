<?php get_header(); ?>

    <section id="content" class="full-width" ng-app="rfstockalike" ng-controller="rfEngineController">

      <div class="container">

        <div class="main-content">
        <input type="hidden" value="<?php echo wp_create_nonce('wp_json'); ?>" id="rfstockalike_nonce" />
        <?php $terms = get_queried_object(); ?>
        <script>
        window.post_id = '?type[]=engine&filter[engine_type]=<?php echo $terms->slug;?>&filter[posts_per_page]=-1';
        </script>

          <?php //if ( have_posts() ): while ( have_posts() ) : the_post(); ?>
            <article>
              <h1><?php echo $terms->name; ?> Engine Configs</h1>
              <button id="select">Select All</button>
              <div id="selectable">
<pre class="config" ng-repeat="engine in engines">
<?php get_template_part('engine-config'); ?>
</pre>
              </div><!-- end selectable -->
            </article>
          <?php //endwhile; // end loop ?>
          <?php //endif; ?>

        </div><!-- end .main-content -->

        <?php //get_sidebar(); ?>

      </div><!-- end .container -->

    </section><!-- end #content -->

<?php get_footer(); ?>
