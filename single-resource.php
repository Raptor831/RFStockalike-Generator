<?php get_header(); global $cmb2_prefix; ?>

    <section id="content">

      <div class="container">

        <div class="main-content">
          <?php //one_time_import(); ?>
          <?php if ( have_posts() ): while ( have_posts() ) : the_post(); ?>
            <article>
              <h1 class="page-title"><?php the_title();?></h1>
              <?php the_content(); ?>
              <?php
              cmb2_metabox_form( 'resource_data', $post->ID );
              ?>
            </article>
          <?php endwhile; // end loop ?>
          <?php endif; ?>

        </div><!-- end .main-content -->

        <?php get_sidebar(); ?>

      </div><!-- end .container -->

    </section><!-- end #content -->

<?php get_footer(); ?>
