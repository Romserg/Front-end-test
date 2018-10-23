const snapSlider = document.getElementsByClassName('slider-snap')[0];

noUiSlider.create(snapSlider, {
    start: [35, 250],
    connect: true,
    range: {
        'min': [0],
        'max': [250]
    },
    step: 1
});

const snapValues = [
    document.getElementsByClassName('slider-snap-value-lower')[0],
    document.getElementsByClassName('slider-snap-value-upper')[0]
];

snapSlider.noUiSlider.on('update', function (values, handle) {
    //removing decimal part
    values.forEach(function (value, index, arr) {
        arr[index] = `$${Math.round(parseInt(value))}`;
    });

    snapValues[handle].innerHTML = values[handle];
});