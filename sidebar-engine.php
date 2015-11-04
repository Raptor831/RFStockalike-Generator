<aside id="main-sidebar">
<?php global $cmb2_prefix; ?>
<?php if (is_front_page()) {
  if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Homepage Widgets") ) :
  endif;
} else {
  if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Inner Widgets") ) :
  endif;
} ?>
<div id="selectable">
<pre class="config" >
<?php get_template_part('engine-config'); ?>
</pre>
</div>

</aside>
