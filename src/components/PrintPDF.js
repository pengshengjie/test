import React, {Component} from 'react';
import html2canvas from "html2canvas";
import {jsPDF} from 'jspdf';
import {connect} from "react-redux";
import _ from 'lodash'

class PrintPDF extends Component {

    composeManagerPDF(component, index) {
        let DOM = component + '_' + index;
        var el = document.getElementById(DOM);
        let canvas = document.createElement("canvas"),
            width = el.offsetWidth + 40,
            height = el.offsetHeight,
            scale = 2;
        canvas.getContext("2d").scale(scale, scale);
        canvas.width = width * scale * 2;
        canvas.height = height * scale * 2;
        canvas.style.width = width * scale + "px";
        canvas.style.height = height * scale + "px";
        canvas.getContext("2d").scale(scale, scale);
        var opts = {
            letterRendering: true,
            dpi: 1200,
            canvas: canvas,
            logging: true,
            scale: scale,
            width: width,
            height: height,
            useCORS: true,
        }
        window.scrollTo(0, 0);
        html2canvas(document.getElementById(DOM), opts).then(
            (canvas) => {
                var context = canvas.getContext('2d');
                context.mozImageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;

                let pdf = new jsPDF('p', 'mm', 'letter', true);
                let imgWidth = pdf.internal.pageSize.getWidth();
                pdf.addImage(canvas.toDataURL('image/JPEG', 1), 'JPEG', 5, 16, imgWidth, 0, undefined, 'FAST');
                pdf.text('test', 10, 10);
                pdf.save('web.pdf');
            }
        );
    }


    render() {
        return (
            <div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        pdf0: _.get(state.PDF.pdf0, 'data', ''),
        pdf1: _.get(state.PDF.pdf1, 'data', ''),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // setPDF: (index, data) => dispatch(actions.setPDFData(index, data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {forwardRef: true}
)(PrintPDF);

