import {waitForTimeout} from '@alwatr/wait';
import {html, nothing, type PropertyValues, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {snackbarActionButtonClickedSignal} from './signal.js';
import {BaseElement} from '../utils/base-element.js';
import {waitForNextFrame} from '../utils/wait-for-next-frame.js';

declare global {
  interface HTMLElementTagNameMap {
    'snack-bar': SnackbarComponent;
  }
}

@customElement('snack-bar')
export class SnackbarComponent extends BaseElement {
  /**
   * The content to be displayed inside the snackbar.
   * @type {string}
   */
  @property({type: String}) content = '';

  /**
   * The label for the action button. If null, the action button will not be rendered.
   * @type {string | null}
   */
  @property({type: String, attribute: 'action-button-label'}) actionButtonLabel: string | null = null;

  /**
   * Whether to add a close button to the snackbar.
   * @type {boolean}
   */
  @property({type: Boolean, attribute: 'add-close-button'}) addCloseButton = false;

  /**
   * Duration for the open and close animation in milliseconds.
   * @type {number}
   * @private
   */
  private static openAndCloseAnimationDuration__ = 200; // ms

  /**
   * Called when the element is first updated.
   * @param {PropertyValues} changedProperties - The changed properties.
   * @protected
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    // wait for render complete, then open the snackbar to start the opening animation
    waitForNextFrame().then(() => {
      this.setAttribute('open', '');
    });
  }

  /**
   * Close the snackbar and remove it from the DOM.
   * Waits for the closing animation to end before removing the element.
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    this.logger_.logMethod?.('close');

    this.removeAttribute('open');

    await waitForTimeout(SnackbarComponent.openAndCloseAnimationDuration__);
    this.remove();
  }

  /**
   * Handle the action button click event.
   * Sends a signal when the action button is clicked.
   * @private
   */
  private actionButtonClickHandler__(): void {
    this.logger_.logMethod?.('actionButtonClickHandler__');

    snackbarActionButtonClickedSignal.notify();
  }

  /**
   * Render the snackbar component.
   * @returns {unknown}
   * @protected
   */
  protected override render(): unknown {
    super.render();

    const actionButtonHtml = this.renderActionButton__();
    const closeButtonHtml = this.renderCloseButton__();

    let actionButtonHandler: TemplateResult | typeof nothing = nothing;
    if (actionButtonHtml != nothing || closeButtonHtml != nothing) {
      actionButtonHandler = html`<div>${actionButtonHtml} ${closeButtonHtml}</div>`;
    }

    return [html`<span>${this.content}</span>`, actionButtonHandler];
  }

  /**
   * Render the action button.
   * @returns {TemplateResult | typeof nothing}
   * @private
   */
  private renderActionButton__(): TemplateResult | typeof nothing {
    if (this.actionButtonLabel == null) return nothing;
    this.logger_.logMethodArgs?.('renderActionButton__', {actionLabel: this.actionButtonLabel});

    return html` <button class="action-button" @click=${this.actionButtonClickHandler__.bind(this)}>${this.actionButtonLabel}</button> `;
  }

  /**
   * Render the close button.
   * @returns {TemplateResult | typeof nothing}
   * @private
   */
  private renderCloseButton__(): TemplateResult | typeof nothing {
    if (this.addCloseButton === false) return nothing;
    this.logger_.logMethod?.('renderCloseButton__');

    return html`
      <button class="close-button" @click=${this.close.bind(this)}>
        <span class="alwatr-icon-font">close</span>
      </button>
    `;
  }
}
