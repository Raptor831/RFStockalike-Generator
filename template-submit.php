<?php
/*
 * Template Name: Submit
 */
?>
<?php
$to = 'joshuabwagner@gmail.com';
$subject = 'New Engine Submission - ';
$message = '';

$json = file_get_contents('php://input');
$obj = json_decode($json);

if ($obj) {
  // foreach ( $obj as $key => $value ) {
  //   $message .= "$key: $value\r\n";
  // }
  // ob_start();
  // print_r($data);
  // $clean = ob_get_clean();
  // $message .= $clean;

  //var_dump($message);

  $clean = new stdClass();

  $clean->title = $obj->title;
  $clean->content_raw = "";
  $clean->meta->ksprfs = $obj->meta->ksprfs;

  $message = 'Mod: ' . $clean->engineMod . "\r\n\r\n";
  $message .= json_encode($clean, JSON_PRETTY_PRINT);

  $subject .= $obj->title;

  $mail = mail($to,$subject,$message);
} else {

//var_dump($_POST);

?>
<?php get_header(); ?>

    <section id="content" ng-app="rfstockalike" ng-controller="rfEngineController">

      <div class="container">

        <div class="main-content">

          <?php if ( have_posts() ): while ( have_posts() ) : the_post(); ?>
            <article>
              <h1 class="page-title"><?php the_title();?></h1>
              <?php the_content(); ?>
              <textarea id="engine" ng-model="engine" name="engine" ng-change="parseField()">

              </textarea>
              <input type="hidden" value="<?php echo wp_create_nonce('wp_json'); ?>" id="rfstockalike_nonce" name="_wp_json_nonce" />
              <p ng-bind="parsed.ksprfs"></p>
              <button ng-click="createEngine(parsed)">Save Engine</button>
              <p><span class="flasherror" ng-repeat="error in errors" ng-bind="error"></span><span class="flashsuccess" ng-repeat="success in successes" ng-bind="success"></span></p>
            </article>
          <?php endwhile; // end loop ?>
          <?php endif; ?>

        </div><!-- end .main-content -->

        <?php get_sidebar(); ?>

      </div><!-- end .container -->

    </section><!-- end #content -->

<?php get_footer(); ?>
<?php } ?>
