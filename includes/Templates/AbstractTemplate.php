<?php
// DESCRIPTION: Base abstract class for weDocs block templates
// DESCRIPTION: Defines the interface that all weDocs templates must implement

namespace WeDevs\WeDocs\Templates;

/**
 * AbstractTemplate class.
 *
 * Shared logic for weDocs block templates.
 * Inspired by WooCommerce's block template system.
 */
abstract class AbstractTemplate {

	/**
	 * The slug of the template.
	 *
	 * @var string
	 */
	const SLUG = '';

	/**
	 * Whether this is a taxonomy template.
	 *
	 * @var bool
	 */
	public bool $is_taxonomy_template = false;

	/**
	 * Initialization method.
	 * Hook into WordPress to register this template.
	 *
	 * @return void
	 */
	abstract public function init();

	/**
	 * Returns the title of the template.
	 *
	 * @return string
	 */
	abstract public function get_template_title();

	/**
	 * Returns the description of the template.
	 *
	 * @return string
	 */
	abstract public function get_template_description();

	/**
	 * Returns the template slug.
	 *
	 * @return string
	 */
	public function get_template_slug() {
		return static::SLUG;
	}
}
