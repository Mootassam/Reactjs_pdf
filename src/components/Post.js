import React, { useState } from "react";
import PDF from "./PDF";
import "./Post.css";
const Post = () => {
  const [form, setForm] = useState([
    {
      quantity: "",
      prix: "",
      tva: "",
      discount: "",
      description: "",
      TTC: "",
    },
  ]);
  const [general, setGenerale] = useState();
  let handleChange = (i, e) => {
    let newFormValues = [...form];
    newFormValues[i][e.target.name] = e.target.value;
    setForm(newFormValues);
  };

  let addFormFields = () => {
    setForm([
      ...form,
      {
        quantity: "",
        prix: "",
        tva: "",
        discount: "",
        description: "",
        TTC: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...form];
    newFormValues.splice(i, 1);
    setForm(newFormValues);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(form));
  };

  let calcule = () => {
    let totale = 0;
    form.map((item, index) => {
      let total1 = item.quantity * item.prix;
      let totaleT = (item.quantity * item.prix * item.tva) / 100;
      let totaleD = (item.quantity * item.prix * item.discount) / 100;
      let TT = total1 + totaleT;
      let VD = (total1 * item.tva * item.discount) / 100;
      if (item.tva && !item.discount) {
        totale = total1 + totaleT;
      }
      if (item.tva && item.discount) {
        totale = TT - VD;
      }
      if (item.discount && !item.tva) {
        totale = total1 - totaleD;
      }
      if (!item.discount && !item.tva) {
        totale = total1;
      }

      setGenerale(totale);
    });
  };
  return (
    <>
      <div className='container'>
        <form className='simple_form form edit_quotation' onSubmit={calcule}>
          <div className='recipient-selected transition visible'>
            <fieldset>
              <legend>Articles</legend>
              {form.map((item, index) => (
                <div
                  key={index}
                  className='rail mt'
                  onMouseLeave={() => calcule()}>
                  <div className='nested-item station'>
                    <div className='station-sign station-sign-counter' />

                    <div generalclassName='station-content'>
                      <div className='row'>
                        <div className='col-lg-11'>
                          <div className='row'>
                            <div className='col-lg-6'>
                              <div className='field select optional quotation_items_item_type'>
                                <div className='select optional selection dropdown float-label'>
                                  <select data-controller='floating-label-input dropdown'>
                                    <option value=''>Sélectionner</option>
                                    <option value={1}>Acompte</option>
                                    <option value={4}>Heures</option>
                                    <option value={5}>Jours</option>
                                    <option value={2}>Produit</option>
                                    <option value={3}>Service</option>
                                  </select>
                                  <i className='dropdown icon' />
                                  <div className='text'>Service</div>
                                </div>
                                <label
                                  className='select optional'
                                  htmlFor='quotation_items_attributes_0_item_type_id'>
                                  Type
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='flex-fields d-block d-md-flex'>
                            <div className='field decimal optional quotation_items_quantity'>
                              <input
                                className='numeric decimal optional float-label'
                                type='number'
                                name='quantity'
                                value={item.quantity || ""}
                                onChange={(e) => handleChange(index, e)}
                              />
                              <label
                                className='decimal optional'
                                htmlFor='quotation_items_attributes_0_quantity'>
                                Quantité
                              </label>
                            </div>
                            <div className='field decimal optional quotation_items_unit_price'>
                              <input
                                className='numeric decimal optional float-label'
                                type='number'
                                name='prix'
                                value={item.prix || ""}
                                onChange={(e) => handleChange(index, e)}
                              />
                              <label
                                className='decimal optional'
                                htmlFor='quotation_items_attributes_0_unit_price'>
                                Prix HT
                              </label>
                            </div>
                            <div className='field decimal optional quotation_items_tax'>
                              <input
                                className='numeric decimal optional float-label'
                                data-controller='floating-label-input'
                                type='number'
                                name='tva'
                                value={item.tva || ""}
                                onChange={(e) => handleChange(index, e)}
                              />
                              <label
                                className='decimal optional'
                                htmlFor='quotation_items_attributes_0_tax'>
                                TVA
                              </label>
                            </div>
                            <div className='fields-group'>
                              <div className='field decimal optional quotation_items_reduction w-100'>
                                <input
                                  className='numeric decimal optional float-label'
                                  type='number'
                                  step='any'
                                  name='discount'
                                  value={item.discount || ""}
                                  onChange={(e) => handleChange(index, e)}
                                />
                                <label
                                  className='decimal optional'
                                  htmlFor='quotation_items_attributes_0_reduction'>
                                  Réduction
                                </label>
                              </div>
                              <div className='field select optional quotation_items_reduction_unit'>
                                <div
                                  className='select optional selection dropdown item-reduction-unit float-label'
                                  tabIndex={0}>
                                  <select data-controller='floating-label-input dropdown'>
                                    <option value='' label=' ' />
                                    <option value='percent'>%</option>
                                    <option value='currency'>€</option>
                                  </select>
                                  <i className='dropdown icon' />
                                  <div className='text'>€</div>
                                  <div className='menu' tabIndex={-1}>
                                    <div className='item' data-value='percent'>
                                      %
                                    </div>
                                    <div
                                      className='item active selected'
                                      data-value='currency'>
                                      €
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='field decimal optional disabled quotation_items_price_pretax'>
                              <input
                                className='numeric decimal optional disabled float-label'
                                disabled=''
                                type='number'
                                name='general'
                                value={general || ""}
                                onChange={(e) => setGenerale(e.target.value)}
                              />
                              <label
                                className='decimal optional disabled'
                                htmlFor='quotation_items_attributes_0_price_pretax'>
                                Total HT
                              </label>
                            </div>
                            <div className='field decimal optional quotation_items_price'>
                              <input
                                className='numeric decimal optional float-label'
                                type='number'
                                value={general}
                              />
                              <label
                                className='decimal optional'
                                htmlFor='quotation_items_attributes_0_price'>
                                Total TTC
                              </label>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <div className='field text optional quotation_items_description'>
                                <textarea
                                  rows={2}
                                  className='text optional'
                                  placeholder='description'
                                  name='description'
                                  value={item.description || ""}
                                  onChange={(e) => handleChange(index, e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className='row'>
                <div className='col-xs-12'>
                  <a
                    className='button-flat button-flat-primary add_fields'
                    onClick={() => addFormFields()}>
                    Ajouter une ligne
                  </a>
                </div>
              </div>
            </fieldset>
            <div className='row'>
              <div className='col-lg-7' />
              <div className='col-lg-3'>
                <div className='field decimal optional quotation_reduction'>
                  <input
                    data-model='document.global-reduction'
                    className='numeric decimal optional float-label'
                    type='number'
                    name='general'
                  />
                  <label
                    className='decimal optional'
                    htmlFor='quotation_reduction'>
                    Remise générale
                  </label>
                </div>
              </div>
              <div className='col-lg-1'>
                <div className='field select optional quotation_reduction_unit'>
                  <div
                    className='select optional selection dropdown global-reduction-unit float-label'
                    tabIndex={0}>
                    <select
                      data-controller='floating-label-input dropdown'
                      name='quotation[reduction_unit]'
                      id='quotation_reduction_unit'>
                      <option value='' label=' ' />
                      <option value='percent'>%</option>
                      <option value='currency'>€</option>
                    </select>
                    <i className='dropdown icon' />
                    <div className='text'>%</div>
                    <div className='menu' tabIndex={-1}>
                      <div
                        className='item active selected'
                        data-value='percent'>
                        %
                      </div>
                      <div className='item' data-value='currency'>
                        €
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-11'>
                <div className='item-summary'>
                  <dl className='dl-items'>
                    <dt>Total HT</dt>
                    <dd data-bind='document.pricePretax'>1 390,00 €</dd>
                    <dt>Remise générale</dt>
                    <dd data-bind='document.globalReductionAmount'>278,00 €</dd>
                    <dt>Total HT final</dt>
                    <dd data-bind='document.pricePretaxWithGlobalReduction'>
                      1 112,00 €
                    </dd>
                    <dt>TVA</dt>
                    <dd data-bind='document.tax'>222,40 €</dd>
                    <dt>Total</dt>
                    <dd data-bind='document.price'>1 334,40 €</dd>
                  </dl>
                </div>
              </div>
            </div>

            <input
              type='submit'
              className='button button button-large button-green'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;
